import { eventType } from "./interfaces";

export class Slider {
  startPosition: number;
  range: HTMLDivElement;
  min: number;
  max: number;
  handles: Element[];
  activeHandle!: Element;
  moveTouchListener!: EventListenerOrEventListenerObject;
  moveListener!: EventListenerOrEventListenerObject;
  constructor(element: HTMLDivElement, min: number, max: number) {
    this.range = element;
    this.min = min;
    this.max = max;
    this.handles = [...this.range.querySelectorAll('.handle')];
    this.startPosition = min;
    this.activeHandle;
    this.handles.forEach(handle => {
      handle.addEventListener('mousedown', this.startMove.bind(this));
      handle.addEventListener('touchstart', this.startMove.bind(this));
    });
    window.addEventListener('mouseup', this.stopMove.bind(this));
    window.addEventListener('touchend', this.stopMove.bind(this));
    window.addEventListener('touchcancel', this.stopMove.bind(this));
    window.addEventListener('touchleave', this.stopMove.bind(this));
    
    const rangeRect = this.range.getBoundingClientRect();
    const handleRect = this.handles[0].getBoundingClientRect();
    const firstHandle = this.handles[0] as HTMLElement | null;
    const secondHandle = this.handles[1] as HTMLElement | null;
    this.range.style.setProperty("--x-1", "0px");
    this.range.style.setProperty("--x-2", rangeRect.width - handleRect.width / 2 + "px");
    firstHandle!.dataset.value = this.range.dataset.min;
    secondHandle!.dataset.value = this.range.dataset.max;
  }

  startMoveTouch(e: TouchEvent) {
    const handleRect = e.target as HTMLElement;
    const bounding = handleRect.getBoundingClientRect();
    this.startPosition = e.touches[0].clientX - bounding.x;
    this.activeHandle = e.target as HTMLElement;
    this.moveTouchListener = this.moveTouch.bind(this);
    window.addEventListener("touchmove", this.moveTouchListener);
  }

  startMove(e: Event): void {
    console.log(`start move`);
    
    this.startPosition = (e as MouseEvent).offsetX;
    this.activeHandle = e.target as HTMLElement;
    this.moveListener = this.move.bind(this);
    window.addEventListener("mousemove", this.moveListener);
  }

  moveTouch(e: Event) {
    this.move({ clientX: (e as TouchEvent).touches[0].clientX });
  }
  move(e: eventType | unknown) { //! is so bad 
    const isLeft = this.activeHandle.classList.contains("left");
    const property = isLeft ? "--x-1" : "--x-2";
    const parentRect = this.range.getBoundingClientRect();
    const handleRect = this.activeHandle.getBoundingClientRect();
    let newX = (e as { clientX: number; }).clientX - parentRect.x - this.startPosition;
    if (isLeft) {
      const otherX = parseInt(this.range.style.getPropertyValue("--x-2"));
      newX = Math.min(newX, otherX - handleRect.width);
      newX = Math.max(newX, 0 - handleRect.width / 2);
    } else {
      const otherX = parseInt(this.range.style.getPropertyValue("--x-1"));
      newX = Math.max(newX, otherX + handleRect.width);
      newX = Math.min(newX, parentRect.width - handleRect.width / 2);
    }
    const handler = this.activeHandle as HTMLElement | null;
    handler!.dataset.value = this.calcHandleValue((newX + handleRect.width / 2) / parentRect.width);
    this.range.style.setProperty(property, newX + "px");
  }

  calcHandleValue(percentage: number): string {
    return Math.round(percentage * (this.max - this.min) + this.min) + '';
  }
  stopMove() {
    window.removeEventListener("mousemove", this.moveListener);
    window.removeEventListener("touchmove", this.moveTouchListener);
  }
}