import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { SwitcheslistComponent } from './components/switches/switcheslist/switcheslist.component';
import { SwitchesgraficoComponent } from './components/switches/switchesgrafico/switchesgrafico.component';

export const routes: Routes = [
    {path:'', redirectTo:"login", pathMatch:'full'},
    {path:'login', component: LoginComponent},
    {
        path:'admin', component: PrincipalComponent,
        children:[
            {path: 'listswitches', component: SwitcheslistComponent},
            {path: 'graficosswitches', component: SwitchesgraficoComponent},
        ]
    }
];
