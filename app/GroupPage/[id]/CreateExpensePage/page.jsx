'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Check, ChevronsUpDown } from 'lucide-react';

// import { cn } from "../../lib/utils";
import { cn } from '@/lib/utils';

import {
  //   Card as card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Box, Button, Card, Flex, Grid } from '@radix-ui/themes';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
// import FriendComponent from "./FriendComponent";
import prisma from '@/prisma/prismaClient';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { IndianRupee } from 'lucide-react';

import { format, parseISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

import { Checkbox } from '@/components/ui/checkbox';

import Spinner from '@/app/components/Spinner';

const CreateExpensePage = ({ params }) => {
  // console.log(params);
  const { status, data: session } = useSession();

  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [userData, setUserData] = useState();
  const [isSubmitting, setisSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const getfriends = async () => {
    try {
      const data = await fetch(`/api/groups/${params.id}`, {
        cache: 'no-store',
      });
      const friendsData = await data.json();
      const { members } = friendsData;
      // console.log(members);
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

  const formSchema = z.object({
    description: z
      .string()
      .min(10, {
        message: 'description must be at least 5 characters.',
      })
      .max(150, { message: 'description must be at least 150 characters' }),

    amount: z.string(),
    date: z.date().optional(),

    payerId: z.string({
      required_error: 'Please select an email to display.',
    }),

    friends: z
      .array(z.string())
      .refine((value) => value.some((friend) => friend), {
        message: 'You have to select at least one user.',
      }),
  });

  // const memberIds = friends?.map((friend) => friend.id);
  // console.log(memberIds);

  const form = useForm({
    resolver: zodResolver(formSchema),
    reValidateMode: true,
    defaultValues: {
      description: '',
      // payerId: `${userData?.name}`,
      // date: z.optional(z.date()).default(Date()),
      // date: z.date().optional().default(new Date().toISOString()),
      friends: friends?.map((friend) => friend.id),
      // friends: ["recents", "home"],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      // const memberIds = friends.map((frnd) => frnd.id);
      setisSubmitting(true);

      const { description, date, payerId, friends } = values;
      const amount = parseInt(values.amount);
      const groupId = params.id;

      const data = { description, amount, date, payerId, groupId, friends };

      await axios.post('/api/expenses', data);
      // // Do something with the form values.
      // // ✅ This will be type-safe and validated.
      router.push(`/GroupPage/${params.id}`);
      router.refresh();

      // console.log(data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  const items = [
    {
      id: 'recents',
      label: 'Recents',
    },
    {
      id: 'home',
      label: 'Home',
    },
    {
      id: 'applications',
      label: 'Applications',
    },
    {
      id: 'desktop',
      label: 'Desktop',
    },
    {
      id: 'downloads',
      label: 'Downloads',
    },
    {
      id: 'documents',
      label: 'Documents',
    },
  ];

  const date = new Date();
  // const formattedDate = date.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // });

  return (
    <Card
      className="w-full lg:w-9/12 mx-auto"
      my="2"
    >
      <CardHeader>
        <CardTitle className="text-gray-600 font-serif font-semibold text-xl">
          Add an Expense
        </CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-serif font-semibold text-base">
                    Description
                  </FormLabel>
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

            <Grid
              columns={{ initial: '1', md: '2' }}
              gap="6"
            >
              <Flex
                direction="column"
                gap="5"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Description</FormLabel> */}
                      <FormControl>
                        {/* <Input type="number">
                      
                    </Input> */}
                        <Flex
                          align="center"
                          gap="2"
                          className=""
                          pl="2"
                        >
                          <IndianRupee />
                          <Input
                            // className="lg:w-5/12"
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
                  name="payerId"
                  // defaultValue={userData?.name}
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Payer</FormLabel> */}
                      <Select
                        // defaultValue={userData?.name || "shiva"}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Paid By"
                              className="text-gray-600 font-serif font-medium text-base"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {friends.map((friend) => {
                            return (
                              <SelectItem
                                value={friend.id}
                                key={friend.id}
                              >
                                {friend.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  // type="date"
                  // defaultValue={format(Date.now())}
                  // defaultValue={}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger
                          asChild
                          // defaultValue={}
                          // defaultValue={Date.now()}
                        >
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                ' pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                // : format(Date.now(), 'PPP')
                                <span className="font-serif font-medium text-base">
                                  Pick date
                                </span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>
              <Box>
                <FormField
                  control={form.control}
                  name="friends"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-gray-600 font-serif font-semibold text-base">
                          Select Members
                        </FormLabel>
                        {/* <FormDescription>
                          Select the items you want to display in the sidebar.
                        </FormDescription> */}
                      </div>
                      {friends.map((friend) => (
                        <FormField
                          key={friend.id}
                          control={form.control}
                          name="friends"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={friend.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(friend.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            friend.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== friend.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {friend.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Box>
            </Grid>

            <Button
              disabled={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
              className="w-6/12"
            >
              {isSubmitting ? (
                <h2 className="text-gray-200 font-serif font-medium text-base">
                  Saving...{' '}
                </h2>
              ) : (
                <h2 className="text-gray-200 font-serif font-medium text-base">
                  Save
                </h2>
              )}

              {isSubmitting && <Spinner />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export const dynamic = 'force-dynamic';

export default CreateExpensePage;
