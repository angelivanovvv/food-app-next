'use server';

import { saveMeal } from "@/libs/meals";

import { iMeal } from "@/types/meals.types";


const clearProperty = (value: FormDataEntryValue | null) => {
    if (!value) {
        return "";
    }
    return value.toString().trim();
}

export const shareMeal = async function (formData: FormData) {
    "use server";
    const meal = {
        title: clearProperty(formData.get("title")),
        summary: clearProperty(formData.get("summary")),
        instructions: clearProperty(formData.get("instructions")),
        image: formData.get("image"),
        creator: clearProperty(formData.get("name")),
        creator_email: clearProperty(formData.get("email"))
    };
    await saveMeal(meal as iMeal);
    console.log(meal);
};