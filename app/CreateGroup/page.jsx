"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";

import {
  //   Card as card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button, Card } from "@radix-ui/themes";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
// import FriendComponent from "./FriendComponent";
import prisma from "@/prisma/prismaClient";
import axios from "axios";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  type: z.string(),
});

const CreateGroup = () => {
  const { status, data: session } = useSession();

  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  // const [userData, setUserData] = useState();

  // const getUserData = async () => {
  //   try {
  //     const data = await fetch(`api/users/${session?.user.email}`);
  //     const usersData = await data.json();
  //     setUsers(usersData);
  //     console.log(usersData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      const memberIds = friends.map((frnd) => frnd.id);

      const data = { ...values, memberIds };

      await axios.post("api/groups", data);
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      router.push("/");

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const types = [
    {
      value: "Home",
      label: "Home",
    },
    {
      value: "Tour",
      label: "Tour",
    },
    // {
    //   value: "Friends",
    //   label: "Friends",
    // },
    {
      value: "Other",
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

  const getUsers = async () => {
    try {
      const data = await fetch(`api/users`, { cache: "no-store" });
      const usersData = await data.json();
      setUsers(usersData);
      // console.log(usersData);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteFriend = (friendName) => {
    setFriends((prev) => prev.filter((friend) => friend.name !== friendName));
  };

  return (
    <Card className="w-full lg:w-9/12 mx-auto" my="2">
      <CardHeader>
        <CardTitle>Create A New Group</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title of the group..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {friends.length ? (
              <div className="w-full lg:w-7/12">
                {friends.map((friend, index) => (
                  <FriendComponent
                    key={friend.id}
                    name={friend.name}
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
                            "w-full lg:w-7/12",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <div className="w-full flex justify-between">
                            <p>
                              {field.value
                                ? users.find(
                                    (user) => user.email === field.value
                                  )?.name
                                : "Select friend"}
                            </p>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 h-52">
                      <Command>
                        <CommandInput placeholder="Search email..." />
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup className="overflow-auto">
                          {/* {console.log(friends)} */}
                          {users.map((user) => (
                            <CommandItem
                              value={user.email}
                              key={user.id}
                              onSelect={() => {
                                setFriends((prev) => [
                                  ...new Set([
                                    ...prev,
                                    { id: user.id, name: user.name },
                                  ]),
                                ]);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  user.email === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {user.email}
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
                    <div className="w-full lg:w-7/12">
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger id="type">
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
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const FriendComponent = ({ name, onDelete }) => {
  // console.log(name, onDelete);
  return (
    <div
      className={`flex justify-between items-center rounded-lg p-2 text-sm font-medium text-gray-700 border-b-2 " 
    }`}
    >
      <h1 className="">{name}</h1>
      <Button
        size="1"
        className={`ml-8 text-xs font-semibold text-red-400 hover:text-red-500; 
       
      }`}
        onClick={() => onDelete(name)}
      >
        X
      </Button>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CreateGroup;
