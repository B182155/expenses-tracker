"use client";
import Spinner from "@/app/components/Spinner";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { MdOutlineDeleteForever } from "react-icons/md";

const DeleteExpenseButton = ({ expenseId }) => {
  const router = useRouter();
  const [isError, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      // console.log(`Delete Issue ${expenseId}`);
      setDeleting(true);
      await axios.delete("/api/expenses/" + expenseId);
      // alert(expenseId + ' deleted');
      //   router.push('/issues');
      router.refresh();
    } catch (error) {
      setError(true);
      setDeleting(false);
    } finally {
      setDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <div disabled={isDeleting}>
            <MdOutlineDeleteForever color="red" className="h-5 w-5" />
            {isDeleting && <Spinner />}
          </div>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Delete Expense</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Are you sure you want to delete this Expense?
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="start">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      {/* <Dialog.Root open={isError}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Description
            size="2"
            mb="4"
          >
            An Unexpected Error Occurred
          </Dialog.Description>
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              onClick={() => setError(false)}
            >
              Ok
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root> */}
    </>
  );
};

export default DeleteExpenseButton;
