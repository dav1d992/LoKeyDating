import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public items: MenuItem[] = [];
  public model: any = {};
  public loggedIn: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.generateMenuItems();
  }

  generateMenuItems() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
      },
    ];
    if (this.loggedIn) {
      this.items.splice(
        1,
        0,
        {
          label: 'Matches',
          icon: 'pi pi-fw pi-heart-fill',
        },
        {
          label: 'Lists',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Messages',
          icon: 'pi pi-fw pi-comment',
        }
      );
    }
  }

  onLoggedInChange() {
    this.generateMenuItems();
  }

  public login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.loggedIn = true;
        this.generateMenuItems();
      },
      error: (error) => console.log(error),
    });
  }

  public logout() {
    this.loggedIn = false;
    this.generateMenuItems();
  }

  public dropdownVisible = false;
  public selectedOption?: SelectItem;

  public dropdownOptions: SelectItem[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onOptionChange(event: any): void {
    console.log('Selected option:', event.value);
  }
}
