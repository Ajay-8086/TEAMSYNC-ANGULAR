import { Component, OnInit } from '@angular/core';

interface User {
  id: string;
  name: string;
}

@Component({
  selector: 'app-addingMember',
  templateUrl: './addingMember.component.html',
})
export class AddingMemberComponent implements OnInit {
  searchTerm: string = '';
  filteredUsers: User[] = [];
  selectedUsers: User[] = [];
  showCreateNew: boolean = false;

  mockUsers: User[] = [
    { id: '1', name: 'shafinms21' },
    { id: '2', name: 'Shafin' },
    { id: '3', name: 'Sheikh Shafin Ahmad' },
    { id: '4', name: 'Shafin' }
  ];

  constructor() { }

  ngOnInit(): void { }

  onSearch(): void {
    if (this.searchTerm.length >= 3) {
      console.log(this.searchTerm);
      
      this.filteredUsers = this.mockUsers.filter(user => 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.showCreateNew = this.filteredUsers.length === 0;
    } else {
      this.filteredUsers = [];
      this.showCreateNew = false;
    }
  }

  selectUser(user: User): void {
    if (!this.selectedUsers.includes(user)) {
      this.selectedUsers.push(user);
    }
    this.searchTerm = '';
    this.filteredUsers = [];
    this.showCreateNew = false;
  }

  removeUser(user: User): void {
    this.selectedUsers = this.selectedUsers.filter(u => u !== user);
  }

  createNewInvite(): void {
    const newUser: User = { id: '', name: this.searchTerm };
    this.selectedUsers.push(newUser);
    this.searchTerm = '';
    this.filteredUsers = [];
    this.showCreateNew = false;
  }
}
