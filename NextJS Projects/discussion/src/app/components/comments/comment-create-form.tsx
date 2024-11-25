"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState,useActionState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import FormButton from "@/app/components/common/form-button";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const userId = session?.user?.id ?? ""; 
  const [actionState, action] = useActionState(
    actions.createComment.bind(null, { postId, parentId, userId}),
    { errors: {} }
  );

  useEffect(() => {
    if (actionState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [actionState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          isInvalid={!!actionState.errors.content}
          errorMessage={actionState.errors.content?.join(", ")}
        />

        {actionState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {actionState.errors._form?.join(", ")}
          </div>
        ) : null}

        <FormButton>Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
