export interface FormProps {
  formType: FormType;
  isNotRegistered: boolean;
  haveAccount: HaveAccount;
  createAccoutOrLoginIn: 'Create Account' | 'Log In';
}

type FormType = 'Register' | 'Log In';
type HaveAccount = 'Not Registered?' | 'Already Have an Account?';
