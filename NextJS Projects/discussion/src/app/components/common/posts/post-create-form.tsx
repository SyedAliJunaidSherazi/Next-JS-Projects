"use client";
import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import * as actions from "@/actions";
import FormButton from "../form-button";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";

interface PostCreateFormProps{
    slug: string
}
export default function PostCreateForm({slug} : PostCreateFormProps) {
  const { data: session } = useSession();
  // now we will pass three arguments in our server action (formstate for error handling, formdata for values and (first one  ->)slug for getting topic id from db that we got as prop)
  // for passing additinal values in action, we use bind function
  const userId = session?.user?.id ?? ""; 
  const [actionState, action] = useActionState(actions.createPost.bind(null, slug, userId), {
    errors: {},
  });
  

  // State to track if the form submission has been attempted
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition(); // To manage async actions

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setFormSubmitted(true); // Mark that the form has been submitted

    if (session && session.user) {
      const formData = new FormData(e.currentTarget); // Convert FormEvent to FormData

      // Wrap action dispatch inside startTransition to avoid context issues
      startTransition(() => {
        action(formData); // Dispatch action inside transition context
      });
    }
  };

  const handlePopoverClose = () => {
    setFormSubmitted(false); // Reset the form submission state
  };

  return (
    <Popover placement="left" onOpenChange={(isOpen) => !isOpen && handlePopoverClose()}>
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-80">
          <h3 className="text-lg">Create a Post</h3>
          <Input
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="Title"
            isInvalid={!!actionState.errors.title}
            errorMessage={actionState.errors.title?.join(", ")}
          />
          <Textarea
            name="content"
            label="Content"
            labelPlacement="outside"
            placeholder="Content"
            isInvalid={!!actionState.errors.content}
            errorMessage={actionState.errors.content?.join(", ")}
          />
          {formSubmitted && (!session || !session.user) && (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              You must be signed in to create a post.
            </div>
          )}
          <FormButton>Create Post</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
}
