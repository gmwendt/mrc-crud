import {
    ElementRef,
    Inject,
    Injectable,
    ChangeDetectorRef,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
  } from '@angular/core';
  
  import { AnimationEvent } from '@angular/animations';
  
  import { ComponentType } from '@angular/cdk/portal';
  import { OverlayContainer } from '@angular/cdk/overlay';
  
  import {
    DialogPosition,
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
    MatDialogContainer
  } from '@angular/material';
  
  //import { IMoveService, MoveService, MoveOptions } from '../core/move.service';
  
  import { DialogAlertComponent, DialogAlertButton, DialogAlertData, DialogAlertResult } from './dialog-alert/dialog-alert.component';
  
  //import { PortalOverlayContainer } from '../portal/portal.overlay';
  
  export { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
  
  export interface IDialogService {
    open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig): MatDialogRef<T>;
    openAlert<T>(dialogData: DialogAlertData, config?: MatDialogConfig): Promise<DialogAlertResult>;
    //openMovable<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, renderer: Renderer, config?: MatDialogConfig, settings?: HandlerSettings): MatDialogRef<T>
    getDialogById<T>(id: string): MatDialogRef<T>;
    close(): void;
  }
  
  export class HandlerSettings {
    height?: string;
    width?: string;
    top?: string;
    left?: string;
  }
  
  @Injectable()
  export class DialogService implements IDialogService {
  
    private _renderer: Renderer2;
    private _element: ElementRef;
  
    constructor(private _dialog: MatDialog) {//, @Inject(MoveService) private m_service: IMoveService, @Inject(OverlayContainer) private m_container: PortalOverlayContainer) {
    }
  
    open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig): MatDialogRef<T> {
      config = config || new MatDialogConfig();
      config.disableClose = config.disableClose === undefined ? true : config.disableClose;

      return this.open_dialog(componentOrTemplateRef, config);
    }
  
    openAlert<T>(dialogData: DialogAlertData, config?: MatDialogConfig): Promise<DialogAlertResult> {
      //text: string, caption: string, button?: DialogAlertButton, textAlign?: string
      config = config || new MatDialogConfig();
      config.disableClose = config.disableClose === undefined ? true : config.disableClose;

      config.data = <DialogAlertData> {
        button: dialogData.button,
        caption: dialogData.caption,
        text: dialogData.text,
        textAlign: dialogData.textAlign,
        textHeight: dialogData.textHeight
      };
  
      var dialogRef = this.open_dialog(DialogAlertComponent, config);

      if (dialogData.timer) {
        setTimeout(() => {
          dialogRef.close();
        }, dialogData.timer);
      }

      return dialogRef.afterClosed().toPromise();
    }
  
    /*openMovable<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, renderer: Renderer, config?: MatDialogConfig, settings?: HandlerSettings): MatDialogRef<T> {
      config = config || new MatDialogConfig();
      config.disableClose = true;
  
      var dialogRef = this.open_dialog(componentOrTemplateRef, config);
  
      this.m_renderer = renderer;
      this.m_element = (<any>dialogRef)._containerInstance._elementRef;
  
      this.normalize_settings(settings).then((result) => this.create_move_bar(result, dialogRef));
  
      return dialogRef;
    }*/
  
    getDialogById<T>(id: string): MatDialogRef<T> {
      return this._dialog.getDialogById(id);
    }
  
    close(): void {
      this._dialog.closeAll();
    }
    
    private open_dialog<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig): MatDialogRef<T> {
  
      config.viewContainerRef = config.viewContainerRef; //|| this.m_container.viewContainerRef;
  
      var dialogRef = this._dialog.open(componentOrTemplateRef, config);
      var container: MatDialogContainer = (<any>dialogRef)._containerInstance;
  
      var detector: ChangeDetectorRef = (<any>container)._changeDetectorRef;
      detector.markForCheck();
  
      // workaround for issue:
      // https://github.com/angular/material2/issues/6719
      // waiting on fix (manually applied for the meantime):
      // https://github.com/DevVersion/material2/commit/1a492128794a3fbd6702833aa4aa3bb31cf3be23
      container._onAnimationDone = function (this: any, event: AnimationEvent) {
        if (event.toState === 'enter')
          this._trapFocus();
        else if (event.toState === 'exit')
          this._restoreFocus();
  
        // Note: as of Angular 4.3, the animations module seems to fire the `start` callback before
        // the end if animations are disabled. Make this call async to ensure that it still fires
        // at the appropriate time.
        Promise.resolve().then(() => {
          this._animationStateChanged.emit(event);
          this._isAnimating = false;
        });
      }
  
      return dialogRef;
    }
  
    /*private create_move_bar(settings: HandlerSettings, dialogRef: MatDialogRef<any>): void {
      var moveBar = this.m_renderer.createElement(this.m_element.nativeElement, "div");
  
      this.m_renderer.setElementStyle(moveBar, "height", settings.height);
      this.m_renderer.setElementStyle(moveBar, "width", settings.width);
      this.m_renderer.setElementStyle(moveBar, "top", settings.top);
      this.m_renderer.setElementStyle(moveBar, "left", settings.left);
      this.m_renderer.setElementStyle(moveBar, "position", "fixed");
      this.m_renderer.setElementStyle(moveBar, "z-index", "1001");
  
      this.m_service.add("portal", new ElementRef(moveBar), {
        moving: (event: MouseEvent) => this.update_dialog_position(moveBar, dialogRef)
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.remove_move_bar(moveBar);
      });
    }*/
  
    private normalize_settings(settings: HandlerSettings): Promise<HandlerSettings> {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!settings)
            settings = new HandlerSettings();
  
          if (!settings.width) settings.width = this._element.nativeElement.offsetWidth + 'px';
          if (!settings.height) settings.height = '20px';
          if (!settings.top) settings.top = this._element.nativeElement.offsetTop + 'px';
          if (!settings.left) settings.left = this._element.nativeElement.offsetLeft + 'px';
          
          resolve(settings);
        });
      });
    }
  
    private update_dialog_position(moveBar: HTMLDivElement, dialogRef: MatDialogRef<any>): void {
      if (!moveBar || !dialogRef)
        return;
  
      dialogRef.updatePosition({
        left: moveBar.offsetLeft + "px",
        top: moveBar.offsetTop + "px"
      });
    }
  
    /*private remove_move_bar(moveBar: HTMLDivElement): void {
      var handles = new Array<any>();
      handles.push(moveBar);
      this.m_renderer.detachView(handles);
  
      this.m_service.remove("portal", new ElementRef(moveBar));
    }*/
  }