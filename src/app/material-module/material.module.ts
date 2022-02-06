import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { OverlayModule } from '@angular/cdk/overlay';


const MaterialComponents = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatGridListModule,
  MatDividerModule,
  MatIconModule,
  MatTooltipModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSidenavModule,
  MatBadgeModule,
  MatSelectModule,
  MatMenuModule,
  MatTabsModule,
  MatCheckboxModule,
  MatRadioModule,
  MatStepperModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatChipsModule,
  MatSliderModule,
  OverlayModule
]

@NgModule({
  // imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
