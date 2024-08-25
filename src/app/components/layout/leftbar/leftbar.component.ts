import { Component, inject, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../auth/login.service';

@Component({
    selector: 'app-leftbar',
    standalone: true,
    imports: [PanelMenuModule, BadgeModule, RippleModule, CommonModule, RouterModule],
    templateUrl: './leftbar.component.html',
    styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent implements OnInit {
    items!: MenuItem[];

    loginService = inject(LoginService);
    router = inject(Router);
    constructor() { }

    ngOnInit() {
        this.items = [
            {
                label: 'Switches',
                icon: 'pi pi-server',
                items: [
                    {
                        label: 'Detalhar',
                        icon: 'pi pi-arrow-right',
                        routerLink: '/admin/listswitches'
                    },
                    {
                        label: 'Gráficos',
                        icon: 'pi pi-chart-bar',
                        routerLink: '/admin/graficosswitches'
                    }
                ]
            },
            {
                label: 'Sair',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
            }
        ];
    }

    logout() {
        this.loginService.removerToken();  
        this.router.navigate(['/login']); 
    }

    toggleAll() {
        const expanded = !this.areAllItemsExpanded();
        this.items = this.toggleAllRecursive(this.items, expanded);
    }

    private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
        return items.map((menuItem) => {
            menuItem.expanded = expanded;
            if (menuItem.items) {
                menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
            }
            return menuItem;
        });
    }

    private areAllItemsExpanded(): boolean {
        return this.items.every((menuItem) => menuItem.expanded);
    }
}
