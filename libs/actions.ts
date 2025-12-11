'use server';

import { redirect } from "next/navigation";

import { isInvalidText, isInvalidEmail, isInvalidFile, clearProperty } from "@/utils/validation";
import { saveMeal } from "@/libs/meals";

import { invalidImageErrorMessage, invalidEmailErrorMessage, invalidInputErrorMessage } from "@/constants/constants";
import { iMeal } from "@/types/meals.types";
import { revalidatePath } from "next/cache";

export const shareMeal = async function (_prevState: any, formData: FormData) {
    'use server';

    const meal = {
        title: clearProperty(formData.get("title")),
        image: formData.get("image") as File | string,
        summary: clearProperty(formData.get("summary")),
        instructions: clearProperty(formData.get("instructions")),
        creator: clearProperty(formData.get("name")),
        creator_email: clearProperty(formData.get("email"))
    };

    // Validate inputs
    if (isInvalidText(meal.title as string) ||
        isInvalidText(meal.summary as string) ||
        isInvalidText(meal.instructions as string) ||
        isInvalidText(meal.creator as string)) {
        return {
            message: invalidInputErrorMessage
        }
    }

    // Validate email
    if (isInvalidText(meal.creator_email as string) || isInvalidEmail(meal.creator_email as string)) {
        return {
            message: invalidEmailErrorMessage
        }
    }

    // Validate image
    if (isInvalidFile(meal.image as File)) {
        return {
            message: invalidImageErrorMessage
        }
    }

    await saveMeal(meal as iMeal);
    revalidatePath("/meals");
    redirect("/meals");
};