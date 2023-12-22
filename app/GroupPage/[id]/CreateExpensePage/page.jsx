"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "../../lib/utils";
import { cn } from "@/lib/utils";

import {
  //   Card as card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, Card, Flex } from "@radix-ui/themes";

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
import { Textarea } from "@/components/ui/textarea";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
// import FriendComponent from "./FriendComponent";
import prisma from "@/prisma/prismaClient";
import axios from "axios";
import { useSession } from "next-auth/react";

import { IndianRupee } from "lucide-react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const CreateExpensePage = ({ params }) => {
  // console.log(params);
  const { status, data: session } = useSession();

  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState();

  const formSchema = z.object({
    description: z
      .string()
      .min(10, {
        message: "description must be at least 5 characters.",
      })
      .max(150, { message: "description must be at least 150 characters" }),

    amount: z.string(),
    date: z.date().optional().default(new Date().toISOString()),

    payerId: z.string({
      required_error: "Please select an email to display.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      // const memberIds = friends.map((frnd) => frnd.id);

      const { description, date, payerId } = values;
      const amount = parseInt(values.amount);
      const groupId = params.id;

      const data = { description, amount, date, payerId, groupId };

      await axios.post("/api/expenses", data);
      // // Do something with the form values.
      // // ✅ This will be type-safe and validated.
      router.push(`/GroupPage/${params.id}`);
      router.refresh();

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // const getUsers = async () => {
  //   try {
  //     const data = await fetch(`api/users`, { cache: "no-store" });
  //     const usersData = await data.json();
  //     setUsers(usersData);
  //     console.log(usersData);
  //   } catch (error) {
  //     // console.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);
  const getfriends = async () => {
    try {
      const data = await fetch(`/api/groups/${params.id}`, {
        cache: "no-store",
      });
      const friendsData = await data.json();
      const { members } = friendsData;
      console.log(members);
      setFriends(members);
    } catch (error) {
      console.error(error.message);
    }
  };

  // console.log(friends);

  useEffect(() => {
    getfriends();
  }, []);

  const getUserData = async ({ session }) => {
    try {
      const data = await fetch(`/api/users/${session?.user.email}`);
      const userData = await data.json();
      setUserData(userData);
      // console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData({ session });
  }, [session]);

  const handleDeleteFriend = (friendName) => {
    setFriends((prev) => prev.filter((friend) => friend.name !== friendName));
  };

  // const date = new Date();
  // const formattedDate = date.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // });

  return (
    <Card className="w-full lg:w-9/12 mx-auto" my="2">
      <CardHeader>
        <CardTitle>Add an Expense</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description ..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Description</FormLabel> */}
                  <FormControl>
                    {/* <Input type="number">
                      
                    </Input> */}
                    <Flex align="center" gap="2" className="" pl="2">
                      <IndianRupee className="" />
                      <Input
                        className="lg:w-1/2"
                        type="number"
                        placeholder="0.00"
                        {...field}
                      />
                    </Flex>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-7/12 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payer</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={userData?.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Paid by" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {friends.map((friend) => {
                        return (
                          <SelectItem value={friend.id} key={friend.id}>
                            {friend.name}
                          </SelectItem>
                        );
                      })}
                      {/* <SelectItem value={friends[0]?.id}>
                        {friends[0]?.name}
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem> */}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* {friends.length ? (
              <div className="w-full lg:w-7/12">
                {friends.map((friend, index) => (
                  <FriendComponent
                    key={friend.id}
                    name={friend.name}
                    onDelete={handleDeleteFriend}
                  />
                ))}
              </div>
            ) : null} */}

            {/* <FormField
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
            /> */}

            {/* <FormField
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
            /> */}
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

export default CreateExpensePage;
