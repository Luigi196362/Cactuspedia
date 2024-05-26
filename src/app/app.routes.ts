import { RouterModule, Routes } from '@angular/router';
import { WikiComponent } from './wiki/wiki.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FakePlantComponent } from './fake-product/fake-plant.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { GamesComponent } from './games/games.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PublicationDetailsComponent } from './publication-details/publication-details.component';
import { GamePageComponent } from './game-page/game-page.component';
import { IaChatComponent } from './ia-chat/ia-chat.component';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';


export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'reset-password/:email/:token', component: ResetPasswordComponent },
  { path: 'fake', component: FakePlantComponent },
  { path: 'plant-details', component: PlantDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'games', component: GamesComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'publication-details', component: PublicationDetailsComponent },
  { path: 'game-page', component: GamePageComponent },
  { path: 'ia-chat',component:IaChatComponent },
  { path: 'subscription-page',component:SubscriptionPageComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }