import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NoticeService} from "./notice.service";
import {ToasterService} from "../../../users/services/toaster.service";

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit{
  noticeForm!: FormGroup;
  users: any[] = [];
  successMessage = '';
  errorMessage = '';
  selectedUsers: number[] = [];
  constructor(private noticeService: NoticeService,
              private toastrService:ToasterService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.noticeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
      userIds: [[], [Validators.required]]
    });

    this.loadUsers();
  }

  loadUsers(): void {
    this.noticeService.getAllUsers().subscribe(
      (data) => (this.users = data),
      (error) => (this.errorMessage = 'Failed to load users.')
    );
  }
  toggleUserSelection(userId: number): void {
    const index = this.selectedUsers.indexOf(userId);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(userId);
    }
    this.noticeForm.patchValue({ userIds: this.selectedUsers });
  }

  selectAllUsers(): void {
    this.selectedUsers = this.users.map(user => user.id);
    this.noticeForm.patchValue({ userIds: this.selectedUsers });
  }

  unselectAllUsers(): void {
    this.selectedUsers = [];
    this.noticeForm.patchValue({ userIds: this.selectedUsers });
  }
  sendNotice(): void {
    if (this.noticeForm.valid) {
      this.noticeService.createNotice(this.noticeForm.value).subscribe(
        (response) => {
          this.successMessage = 'Notice sent successfully!';
          this.toastrService.successMessage("Notice Sent Successfully ","Success")
          this.noticeForm.reset();
        },
        (error) => (this.errorMessage = 'Failed to send notice.')
      );
    }
  }

}
