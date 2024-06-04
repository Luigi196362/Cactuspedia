import { RouterModule, Routes } from '@angular/router';
import { WikiComponent } from './pages/wiki/wiki.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PlantComponent } from './components/plant/plant.component';
import { PlantDetailsComponent } from './pages/plant-details/plant-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { GamesComponent } from './pages/games/games.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PublicationDetailsComponent } from './pages/publication-details/publication-details.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { IaChatComponent } from './pages/ia-chat/ia-chat.component';
import { SubscriptionPageComponent } from './pages/subscription-page/subscription-page.component';
import { CreatePlantComponent } from './pages/create-plant/create-plant.component'; 
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'reset-password/:email/:token', component: ResetPasswordComponent },
  { path: 'Plant', component: PlantComponent },
  { path: 'plant-details/:id', component: PlantDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'games', component: GamesComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'publication-details', component: PublicationDetailsComponent },
  { path: 'game-page', component: GamePageComponent },
  { path: 'ia-chat',component:IaChatComponent },
  { path: 'subscription-page',component:SubscriptionPageComponent },
  {path:'create-plant',component: CreatePlantComponent},
  {path:'create-product',component: CreateProductComponent},
  {path:'create-game',component:CreateGameComponent},
  {path:'create-post',component:CreatePostComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }