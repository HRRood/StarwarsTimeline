"use client";
import { TextInput } from "@/components/Global/Form/TextInput/TextInput";
import { CreateDialog } from "@/components/CreateDialog/CreateDialog";
import { mutate } from "swr";
import { useLoadMediaTypes } from "@/hooks/useLoadMediaTypes";
import { z } from "zod";
import styles from "./CreateMediaForm.module.css";
import { getUseLoadMediaKey } from "@/hooks/useLoadMedia";
import { SelectInput } from "@/components/Global/Form/SelectInput/SelectInput";
import { DateInput } from "@/components/Global/Form/DateInput/DateInput";

const DataValidation = z.object({
  title: z.string().nonempty("Field is required"),
  description: z.string().nonempty("Field is required"),
  releaseDate: z.date(),
  mediaTypeId: z.coerce.number(),
  dateFrom: z.coerce.number(),
  dateTo: z.coerce.number(),
});

export const CreateMediaForm = () => {
  const mediaTypes = useLoadMediaTypes();

  const onNewMediaSubmit = async (data: any, callback: () => void) => {
    console.log(data);
    fetch("/api/media", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        mutate(getUseLoadMediaKey());
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CreateDialog DataValidation={DataValidation} title="Create new Media type" onSubmit={onNewMediaSubmit}>
      <div className={styles.fields_group}>
        <TextInput id="title" name="title" label="Title" />
        <TextInput id="description" name="description" label="Description" multiline />
      </div>
      <div className={styles.fields_group}>
        <DateInput label="Release Date" name="releaseDate" />
        <SelectInput id="mediaType" label="Media Type" name="mediaTypeId" options={mediaTypes.data?.map((x) => ({ label: x.name, value: x.id })) || []} />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="dateFrom" name="dateFrom" label="Date From" type="number" />
        <TextInput id="dateTo" name="dateTo" label="Date To" type="number" />
      </div>
    </CreateDialog>
  );
};
