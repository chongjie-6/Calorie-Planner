"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

export default function RequirementForm() {
  const router = useRouter();
  /* Create a form object */
  const formSchema = z.object({
    calories: z.coerce.number().max(10000, "Maximum 10000 calories"),
    meals: z.coerce
      .number({
        invalid_type_error: "Please enter a valid number",
      })
      .min(1, "Must have at least 1 meal")
      .max(10, "Maximum 10 meals per day"),
    protein: z.coerce.number().max(500, "Maximum 500g protein"),
    fats: z.coerce.number().max(1000, "Maximum 1000g fats"),
    carbs: z.coerce.number().max(1000, "Maximum 1000g carbs"),
  });

  /* Define Form*/
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calories: "" as unknown as number,
      meals: "" as unknown as number,
      protein: "" as unknown as number,
      fats: "" as unknown as number,
      carbs: "" as unknown as number,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("calories", String(values.calories));
    localStorage.setItem("carbs", String(values.carbs));
    localStorage.setItem("fats", String(values.fats));
    localStorage.setItem("meals", String(values.meals));
    localStorage.setItem("protein", String(values.protein));
    router.push("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-5 text-white w-full max-w-xl `}
      >
        <div className="text-center text-3xl font-semibold">
          <h1>Please Enter Your Meal Preferences.</h1>
          <FormDescription>
            If a field is left empty, it will assume there are no requirements.
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="meals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meals a Day *</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories a Day</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="protein"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Protein Per Day</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fats a Day</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carbs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carbohydrates a Day</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="flex justify-end">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
