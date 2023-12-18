"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  //   Card as card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, Card } from "@radix-ui/themes";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
// import FriendComponent from "./FriendComponent";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  type: z.string(),
});

const CreateGroup = () => {
  const [friends, setFriends] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      type: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    const formdata = { ...values, friends };
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(formdata);
  }

  const types = [
    {
      value: "home",
      label: "Home",
    },
    {
      value: "tour",
      label: "Tour",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  const friendsList = [
    { label: "Shiva", value: "shiva" },
    { label: "Sukesh", value: "sukesh" },
    { label: "Karthik", value: "karthik" },
    { label: "Anil", value: "anil" },
    // { label: "Portuguese", value: "pt" },
  ];

  const handleDeleteFriend = (friendName) => {
    setFriends((prev) => prev.filter((friend) => friend !== friendName));
  };

  return (
    <Card className="w-8/12 mx-auto" mt="4">
      <CardHeader>
        <CardTitle>Create A New Group</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title of the group..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {friends.length ? (
              <div className="w-8/12">
                {friends.map((friend, index) => (
                  <FriendComponent
                    key={index}
                    name={friend}
                    onDelete={handleDeleteFriend}
                  />
                ))}
              </div>
            ) : null}

            <FormField
              control={form.control}
              name="friend"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Add Friends</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? friendsList.find(
                                (friend) => friend.value === field.value
                              )?.label
                            : "Select friend"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search friend..." />
                        <CommandEmpty>No friend found.</CommandEmpty>
                        <CommandGroup>
                          {/* {console.log(friends)} */}
                          {friendsList.map((friend) => (
                            <CommandItem
                              value={friend.label}
                              key={friend.value}
                              onSelect={() => {
                                setFriends((prev) => [
                                  ...new Set([...prev, friend.value]),
                                ]);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  friend.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {friend.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Type</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="type1">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {types.map((type) => {
                          return (
                            <SelectItem value={type.value} key={type.value}>
                              {type.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const FriendComponent = ({ name, onDelete }) => (
  <div
    className={`flex justify-between items-center rounded-md p-2 text-sm font-medium text-gray-700 border-b-2 " 
    }`}
  >
    <h1 className="">{name}</h1>
    <button
      className={`ml-8 text-xs font-semibold text-red-400 hover:text-red-500; 
       
      }`}
      onClick={() => onDelete(name)}
    >
      X
    </button>
  </div>
);

export default CreateGroup;
