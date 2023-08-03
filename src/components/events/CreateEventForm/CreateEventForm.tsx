"use client";

import { CreateDialog } from "@/components/CreateDialog/CreateDialog";
import { getUseLoadEventsKey } from "@/hooks/useLoadEvents";
import { mutate } from "swr";
import { z } from "zod";

import styles from "./CreateEventForm.module.css";
import { TextInput } from "@/components/Global/Form/TextInput/TextInput";

const DataValidation = z.object({
  title: z.string().nonempty("Field is required"),
  description: z.string().nonempty("Field is required"),
  fromDate: z
    .string()
    .nonempty("Field is required")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  toDate: z
    .string()
    .nonempty("Field is required")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  imageUrl: z.string().optional(),
});

export const CreateEventForm = () => {
  const onEventSubmit = async (data: any, callback: () => void) => {
    fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        mutate(getUseLoadEventsKey());
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CreateDialog onSubmit={onEventSubmit} title="Create new event" DataValidation={DataValidation}>
      <div className={styles.fields_group}>
        <TextInput id="title" name="title" label="Title" />
        <TextInput id="description" name="description" label="Description" multiline />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="fromDate" name="fromDate" label="From Date" type="number" />
        <TextInput id="toDate" name="toDate" label="To Date" type="number" />
      </div>
    </CreateDialog>
  );
};
