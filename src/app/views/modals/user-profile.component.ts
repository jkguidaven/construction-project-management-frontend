import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Auth from '@aws-amplify/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  ready: boolean;
  form: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    birthdate: new FormControl(null, []),
    phone: new FormControl('', []),
  });

  photo!: string;
  email!: string;

  constructor(
    private dialogRef: MatDialogRef<UserProfileComponent>,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    Auth.currentUserInfo().then(({ attributes: info }: any) => {
      this.email = info.email;
      this.photo = info.picture;
      this.form.get('firstname').setValue(info.given_name);
      this.form.get('lastname').setValue(info.family_name);
      this.form.get('phone').setValue(info.phone_number);
      this.form
        .get('birthdate')
        .setValue(info.birthdate ? new Date(info.birthdate) : null);

      this.ready = true;
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

  async onSubmit() {
    this.form.disable();
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        given_name: this.form.get('firstname').value,
        family_name: this.form.get('lastname').value,
        phone_number: this.form.get('phone').value,
        birthdate: this.form.get('birthdate').value
          ? this.getFormattedDate(this.form.get('birthdate').value)
          : null,
      });

      this.snackbar.open('Successfully updated profile!', null, {
        duration: 3000,
      });
      this.dismiss();
    } catch (ex) {
      console.error(ex);
    } finally {
      this.form.enable();
    }
  }

  getFormattedDate(date): string {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }
}
