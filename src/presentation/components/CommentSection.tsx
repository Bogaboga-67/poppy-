"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Comment, CurrentUser } from "@/domain/entities";
import { formatCount, timeAgo } from "@/presentation/lib/format";

type Sort = "top" | "newest";

export function CommentSection({
  videoId,
  comments: initial,
  currentUser,
}: {
  videoId: string;
  comments: Comment[];
  currentUser: CurrentUser;
}) {
  const [comments, setComments] = useState(initial);
  const [text, setText] = useState("");
  const [sort, setSort] = useState<Sort>("top");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const roots = useMemo(() => {
    const list = comments.filter((c) => !c.parentId);
    if (sort === "newest") {
      return [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return [...list].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.likes - a.likes;
    });
  }, [comments, sort]);

  const repliesOf = (id: string) =>
    comments
      .filter((c) => c.parentId === id)
      .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

  async function submit(parentId: string | null, value: string, clear: () => void) {
    const res = await fetch(`/api/videos/${videoId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value, parentId }),
    });
    if (!res.ok) return;
    const comment = (await res.json()) as Comment;
    setComments((prev) => [comment, ...prev]);
    clear();
  }

  async function onTopSubmit(e: FormEvent) {
    e.preventDefault();
    await submit(null, text, () => setText(""));
  }

  async function like(id: string) {
    const res = await fetch(`/api/comments/${id}/like`, { method: "POST" });
    if (!res.ok) return;
    const updated = (await res.json()) as Comment;
    setComments((prev) => prev.map((c) => (c.id === id ? updated : c)));
  }

  return (
    <section className="mt-6">
      <div className="mb-6 flex items-center gap-8">
        <h2 className="text-xl font-bold">{comments.length} Comments</h2>
        <button
          onClick={() => setSort((s) => (s === "top" ? "newest" : "top"))}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 5H3v1h6v-1z" />
          </svg>
          Sort by {sort === "top" ? "top" : "newest"}
        </button>
      </div>

      <form onSubmit={onTopSubmit} className="mb-8 flex gap-3">
        <img src={currentUser.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
        <div className="flex-1">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border-b border-[#3f3f3f] bg-transparent py-1 outline-none focus:border-white"
          />
          {text ? (
            <div className="mt-2 flex justify-end gap-2">
              <button type="button" onClick={() => setText("")} className="rounded-full px-4 py-2 text-sm hover:bg-[#272727]">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-[#3ea6ff] px-4 py-2 text-sm font-medium text-black"
              >
                Comment
              </button>
            </div>
          ) : null}
        </div>
      </form>

      <ul className="flex flex-col gap-5">
        {roots.map((comment) => (
          <li key={comment.id}>
            <CommentRow
              comment={comment}
              onLike={() => like(comment.id)}
              onReply={() => setReplyingTo(comment.id)}
            />
            {replyingTo === comment.id ? (
              <form
                className="ml-12 mt-3 flex gap-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await submit(comment.id, replyText, () => {
                    setReplyText("");
                    setReplyingTo(null);
                  });
                }}
              >
                <img src={currentUser.avatarUrl} alt="" className="h-6 w-6 rounded-full" />
                <div className="flex-1">
                  <input
                    autoFocus
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${comment.authorName}`}
                    className="w-full border-b border-[#3f3f3f] bg-transparent py-1 text-sm outline-none focus:border-white"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText("");
                      }}
                      className="rounded-full px-3 py-1.5 text-sm hover:bg-[#272727]"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="rounded-full bg-[#3ea6ff] px-3 py-1.5 text-sm font-medium text-black">
                      Reply
                    </button>
                  </div>
                </div>
              </form>
            ) : null}
            {repliesOf(comment.id).length ? (
              <ul className="ml-12 mt-3 flex flex-col gap-4">
                {repliesOf(comment.id).map((reply) => (
                  <li key={reply.id}>
                    <CommentRow comment={reply} onLike={() => like(reply.id)} compact />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommentRow({
  comment,
  onLike,
  onReply,
  compact,
}: {
  comment: Comment;
  onLike: () => void;
  onReply?: () => void;
  compact?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <img
        src={comment.authorAvatar}
        alt=""
        className={compact ? "h-6 w-6 rounded-full" : "h-10 w-10 rounded-full"}
      />
      <div>
        <p className="text-sm">
          <span className="font-medium">{comment.authorName}</span>
          <span className="ml-2 text-xs text-[#aaa]">{timeAgo(comment.createdAt)}</span>
          {comment.isPinned ? (
            <span className="ml-2 text-xs font-medium text-[#aaa]">Pinned</span>
          ) : null}
        </p>
        <p className="mt-1 whitespace-pre-wrap text-sm">{comment.text}</p>
        <div className="mt-1 flex items-center gap-1">
          <button onClick={onLike} className="rounded-full p-2 hover:bg-[#272727]" aria-label="Like comment">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11v9h10.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 11.58 20.18 11 18.77 11zM7 20H4V11h3v9z" />
            </svg>
          </button>
          <span className="text-xs text-[#aaa]">{formatCount(comment.likes)}</span>
          <button className="rounded-full p-2 hover:bg-[#272727]" aria-label="Dislike comment">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="rotate-180">
              <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11v9h10.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 11.58 20.18 11 18.77 11zM7 20H4V11h3v9z" />
            </svg>
          </button>
          {onReply ? (
            <button onClick={onReply} className="rounded-full px-3 py-1 text-xs font-medium hover:bg-[#272727]">
              Reply
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
