import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products/products.component';
import { HomeComponent } from './auth/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './auth/navigation/navigation.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { AddComponent } from './products/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "products", component: ProductsComponent, canActivate: [AuthGuard]},
      {path: "add", component: AddComponent, canActivate: [AuthGuard]},
      {path: "home", component: HomeComponent},
      {path: "login", component: LoginComponent},
      {path: "register", component: RegisterComponent},
      {path: "", redirectTo: "home", pathMatch: "full"},
      {path: "**", redirectTo: "home"}
    ])
  ],
  providers: [AuthService, CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
