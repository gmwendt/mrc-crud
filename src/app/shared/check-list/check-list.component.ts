import { Component, Input, ViewEncapsulation } from '@angular/core';

export class CheckListItem {
  private _checked: boolean = false;

  constructor(public children: CheckListItem[], public text: string, public isChecked?: boolean) { 
    this._checked = isChecked;
  }

  public set checked(value: boolean) {
    if (this._checked == value)
      return;

    this._checked = value;
  }

  public get checked(): boolean {
    if (this.children.length > 0 && this.children.every(child => child.checked)) {
      this._checked = true;
      return true;
    }
    else if (this.children.length > 0 && this.children.every(child => !child.checked)) {
      this._checked = false;
      return false;
    }

    return this._checked;
  }
  
  public get indeterminate(): boolean {
    if (this.children.every(child => child.checked)) 
      return false;

    return this.children.some(child => child.checked);
  }
}

@Component({
  selector: 'mrc-check-list',
  templateUrl: './check-list.component.html',
  // styleUrls: ['./check-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckListComponent {

  @Input() data: CheckListItem[];
  @Input() marginLeft: string = '0px';

  constructor() { }

  private checkbox_changed(checked: boolean, item: CheckListItem): void {
    if (item.children.length > 0) 
      item.children.forEach(child => child.checked = checked);
  }
}