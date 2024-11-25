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
import FormButton from "../common/form-button";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";

export default function TopicCreateForm() {
  const { data: session } = useSession();
  const [actionState, action] = useActionState(actions.createTopic, {
    errors: {},
  });

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
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!actionState.errors.name}
              errorMessage={actionState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your Topic"
              isInvalid={!!actionState.errors.description}
              errorMessage={actionState.errors.description?.join(", ")}
            />
            {formSubmitted && (!session || !session.user) && (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                You must be signed in to create a topic.
              </div>
            )}
            {/* Using custom FormButton */}
            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
