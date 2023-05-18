import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public navOptions: MenuItem[] = [];
  public userOptions: MenuItem[] = [];
  public model: any = {};
  public loggedIn = false;
  public darkMode = false;
  public userName: string = '';

  constructor(
    private accountService: AccountService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.darkMode = this.themeService.isDarkMode();

    this.accountService.currentUser$.subscribe((user) => {
      if (user === null) {
        this.loggedIn = false;
      } else {
        console.log('user', user);
        this.userName = user.userName;
        this.loggedIn = true;
      }
    });
    this.setNavOptions();
    this.setUserOptions();
  }

  private setNavOptions() {
    this.navOptions = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
    ];
    if (this.accountService.currentUser$) {
      this.navOptions.splice(
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

  private setUserOptions() {
    this.userOptions = [
      {
        label: 'Edit profile',
        icon: 'pi pi-fw pi-user-edit',
      },
      {
        label: 'Sign out',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.signOut();
        },
      },
    ];
  }

  public login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.loggedIn = true;
        this.setNavOptions();
      },
      error: (error) => console.log(error),
    });
  }

  public signOut() {
    this.accountService.signOut();
    this.loggedIn = false;
    this.setNavOptions();
  }

  public toggleTheme() {
    this.darkMode = !this.darkMode;
    const lightOrDark = this.darkMode ? 'dark' : 'light';
    this.themeService.setTheme(`bootstrap4-${lightOrDark}-blue`);
  }
}
