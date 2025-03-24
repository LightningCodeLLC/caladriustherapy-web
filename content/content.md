# therapist finder form quiz

The form relies on tags in [`team.yaml`](./team.yaml). The `QuizTags` object in [`quiz.ts`](./quiz.ts) shows all of the possible tags, and intellisense should help you out as well.

I built this around JSON Schema to make it easier and more intuitive to get the hang of. This means that it will be more arduous to add new tags than just ignoring a schema. Feel free to remove the schema files and only edit the `yaml` and `ts` files if you would prefer.

## Making a new question

Questions are defined in [`quiz.yaml`](./quiz.yaml). A question is structured as follows:

```yaml
- title: # the question as it will be displayed
  type: # type of the question, either `boolean`, `select`, or `multiselect`
  options: # if the type is `select` or `multiselect`, this will be present with the options to choose from
  filtersOn: # which tag this question should filter on
```

### Yes/No

For Yes/No questions, adding a new one is quite straightforward:

```yaml
- title: Are you looking for LGBTQIA+-specific care?
  type: boolean
  filtersOn: lgbtq
```

The most important part here is `filtersOn`. The filtersOn is a key of the `QuizTags` object in [`quiz.ts`](./quiz.ts). In this example, since the `lgbtq` key of the `QuizTags` object is a `boolean`, the question type here will be `boolean` as well.

### Select and Multi-Select

For Select and Multi-Select questions, you must additionally define the options to choose from:

```yaml
- title: Do you want to be seen online or in person?
  type: select
  options:
    - name: Online
      value: online
    - name: In Person
      value: in-person
  filtersOn: location
```

Under `options`, `name` can be whatever you want, but `value` must be a valid tag option. These can also be seen in the the `QuizTags` object in [`quiz.ts`](./quiz.ts) as strings separated by pipes (`|`).

## Add a new tag

To add a new tag, you must add it in three places. This is kind of annoying, but ensures that the actual quiz code doesn't need to be touched.

1. Add the tag under `properties` in [`tags.schema.json`](./schema/tags.schema.json).

   - You can make the tag either a Yes/No, a select, or a multiselect.
     - For just a Yes/No question, set `type` to `boolean`.
     - For a select or multiselect, set `type` to `string`, then list out all of the options in the `"enum": []` array.
   - Finally, make the tag required by adding it to the `required` array.

2. Add the tag to [`quiz.schema.json`](./schema/quiz.schema.json).

   - If the tag is a Yes/No, add it to the `filtersOn` enum under the **first** object in `anyOf`.
   - If the tag is a select or multiselect, add it to the `filtersOn` enum under the **second** object in `anyOf`.

3. Add the tag to [`quiz.ts`](./quiz.ts)

   - Put the tag into the `QuizTags` object, with the type being either `boolean` for Yes/No or each option separated by a `|` inside an array for select or multiselect. For example, the type for the `location` select key is `'online' | 'in-person'`. If it were a multiselect, the type would be `('online' | 'in-person')[]`.
   - Add the tag to the `filtersOn` union in either `BooleanQuizQuestion` or `SelectQuizQuestion`, based on the type.

Once you have completed these steps, [`team.yaml`](./team.yaml) will show errors in VSCode. Open the file, then add the new tag to each team member with the correct value(s). You can then use the new tag in a quiz question!
