## Notes:

## Decisions

### Registration
- Advanced validation for an email (if the email address is already registered ) was done after the user submits the form. Sometimes it is (mostly with username) done when the user finishes typing.

### Login
- When the user's signing in fails, they are not told which of the inputs (email or password) is incorrect (security reason). 

### Other
- Even though the assignment stated 'no need for css or aything fancy', I added Tailwind CSS and some styling (because it didn't explicitly forbit it). 

## Findings
- 'Yup', as a Javascript schema builder for validation, accepts invalid format of an email address, for example abc@abc - without a top-level domain.