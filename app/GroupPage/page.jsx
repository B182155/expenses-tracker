"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";

import { Button, Callout, Card } from "@radix-ui/themes";
import {
  //   Card as card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

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

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
// import { Input } from "../../components/ui/input";

import { Input } from "@/components/ui/input";
// import FriendComponent from "./FriendComponent";
import Spinner from "@/app/components/Spinner";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useSession } from "next-auth/react";

import UserStore from "../Stores/UserStore";

// import useGetdata from "@/lib/useGetdata";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  type: z.string(),
});

const CreateGroup = () => {
  const { status, data: Session } = useSession();
  // console.log(Session);

  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const [isSubmitting, setisSubmitting] = useState(false);
  // const [iserror, setisError] = useState(false);
  const [error, setError] = useState("");

  // const user = useGetdata();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
    },
  });

  const types = [
    {
      value: "Home",
      label: "Home",
    },
    {
      value: "Tour",
      label: "Tour",
    },

    {
      value: "Other",
      label: "Other",
    },
  ];

  const getUsers = async () => {
    try {
      const data = await fetch(`/api/users`, { cache: "no-store" });
      const users = await data.json();
      setUsers(users);

      // console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  const setUser = UserStore((s) => s.setUser);

  const getUserData = async ({ Session }) => {
    try {
      const data = await fetch(`/api/users/${Session?.user.email}`);
      const userData = await data.json();
      // friends?.push(userData);

      setUser(userData);

      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getUserData({ Session });
  }, [Session]);

  async function onSubmit(values) {
    try {
      setisSubmitting(true);
      const memberIds = friends.map((frnd) => frnd.id);
      memberIds.push(userData?.id);
      const createdBy = userData.id;

      const data = { ...values, memberIds, createdBy };

      await axios.post("api/groups", data);

      router.push("/");
      router.refresh();

      // console.log(data);
    } catch (error) {
      setError(error.message);
      // console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  const handleDeleteFriend = (friendName) => {
    setFriends((prev) => prev.filter((friend) => friend.name !== friendName));
  };

  return (
    <Card className="w-full lg:w-9/12 mx-auto" my="2">
      {error && (
        <Callout.Root color="red" className="mb-2">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{`Something went wrong`}</Callout.Text>
        </Callout.Root>
      )}

      <CardHeader>
        <CardTitle className="text-lg  md:text-xl  text-gray-600  font-serif dark:text-slate-300 ">
          NEW GROUP
        </CardTitle>
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
                  <FormLabel className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-slate-300  font-serif font-medium   ">
                    Group Title
                  </FormLabel>
                  <FormControl className=" w-full md:w-6/12 lg:w-7/12">
                    <Input
                      className="text-gray-700"
                      placeholder="Title of the group..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {friends.length ? (
              <div className="w-full lg:w-7/12 ">
                {friends.map((friend) => (
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
                  <FormLabel className="text-base md:text-lg lg:text-xl text-gray-600 font-serif font-medium dark:text-slate-300 ">
                    Add Friends
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          // variant="outline"
                          variant="soft"
                          // size={{ InputBoxSize }}
                          size="3"
                          role="combobox"
                          className={cn(
                            "w-full md:w-6/12 lg:w-7/12",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <div className="w-full flex justify-between ">
                            <h2 className="text-gray-600 font-serif font-light text-md dark:text-slate-300">
                              {field.value
                                ? users.find(
                                    (user) => user.email === field.value
                                  )?.name
                                : "Select Users..."}
                            </h2>
                            {/* <p>Select Users</p> */}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 h-60">
                      <Command>
                        <CommandInput placeholder="Search email..." />
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup className="overflow-auto">
                          {users.map((user) => {
                            if (user.id == userData?.id) return null;
                            else
                              return (
                                <CommandItem
                                  className="text-sm"
                                  value={user.email}
                                  key={user.id}
                                  onSelect={() => {
                                    const userExists = friends.find(
                                      (friend) => friend.id === user.id
                                    );

                                    !userExists &&
                                      setFriends((prev) => [
                                        ...prev,
                                        { id: user.id, name: user.name },
                                      ]);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 ",
                                      user.email === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {user.email}
                                </CommandItem>
                              );
                          })}
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
                  <FormLabel className="text-base md:text-lg lg:text-xl text-gray-600 font-serif font-medium   dark:text-slate-300">
                    Group Type
                  </FormLabel>
                  <FormControl>
                    <div className="w-full md:w-6/12 lg:w-7/12">
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger id="type" className="text-gray-600">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {types.map((type) => {
                            return (
                              <SelectItem value={type.value} key={type.value}>
                                <h2 className="text-base md:text-lg lg:text-xl text-gray-600 font-serif font-light">
                                  {type.label}
                                </h2>
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
            <Button
              disabled={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
              className="w-full md:w-6/12 lg:w-7/12"
            >
              {isSubmitting ? `Saving...  ` : "Save"}

              {isSubmitting && <Spinner />}
            </Button>
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
      className={`flex justify-between items-center rounded-lg p-2 text-sm font-medium text-gray-700 dark:text-slate-300 border-b-2 " 
    }`}
    >
      <h3 className="text-sm font-serif font-medium">{name}</h3>
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
