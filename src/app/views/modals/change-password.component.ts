import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Auth from '@aws-amplify/auth';

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [this.passwordMismatchValidator]
  );

  authError!: string;

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  passwordMismatchValidator(form: FormGroup) {
    return form.get('newPassword').value === form.get('confirmPassword').value
      ? null
      : { passwordMismatch: true };
  }

  async onSubmit(): Promise<void> {
    this.form.disable();
    this.authError = null;
    const user = await Auth.currentAuthenticatedUser();
    try {
      await Auth.changePassword(
        user,
        this.form.get('oldPassword').value,
        this.form.get('newPassword').value
      );
      this.snackbar.open('Successfully change password!', null, {
        duration: 3000,
      });
      this.dismiss();
    } catch (ex) {
      this.authError = ex.code;
    } finally {
      this.form.enable();
    }
  }

  dismiss() {
    this.dialogRef.close();
  }

  getErrorMessage(): string {
    if (
      this.form.errors &&
      this.form.errors['passwordMismatch'] &&
      this.form.get('confirmPassword').touched
    ) {
      return 'Confirmation password does not match.';
    } else if (this.authError) {
      return this.getAuthErrorMessage(this.authError);
    }

    return null;
  }

  getAuthErrorMessage(code: string): string {
    switch (code) {
      case 'NotAuthorizedException':
        return 'Old password is incorrect';
      case 'LimitExceededException':
        return 'You have reach maximum allowable attempts to change password. please try again later.';
      case 'InvalidPasswordException':
        return 'Password does not conform to policy.';
    }
    return 'Error changing password. Please try again later.';
  }
}
