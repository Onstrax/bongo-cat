import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_BONGO_CAT = "bongo-cat-view";

const IDLE_UP =
	"https://raw.githubusercontent.com/saatvik333/wayland-bongocat/main/assets/bongo-cat-both-up.png";
const IDLE_DOWN =
	"https://raw.githubusercontent.com/saatvik333/wayland-bongocat/main/assets/bongo-cat-both-down.png";

const WORK_IMAGES = [
	"https://raw.githubusercontent.com/saatvik333/wayland-bongocat/main/assets/bongo-cat-left-down.png",
	"https://raw.githubusercontent.com/saatvik333/wayland-bongocat/main/assets/bongo-cat-right-down.png",
];

export class BongoCatView extends ItemView {
	private imgElement: HTMLImageElement | null = null;
	private currentIndex = 0;
	private idleTimer: number | null = null;
	private deepIdleTimer: number | null = null;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_BONGO_CAT;
	}

	getDisplayText() {
		return "Bongo cat";
	}

	getIcon() {
		return "cat";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		if (!(container instanceof HTMLElement)) return;

		container.empty();
		const catContainer = container.createDiv({ cls: "bongo-container" });

		// Estado inicial: Both up
		this.imgElement = catContainer.createEl("img", {
			attr: { src: IDLE_UP, id: "bongo-cat-img" },
		});

		// Al abrir, programamos el timer de 5s para pasar a both-down
		this.startDeepIdleTimer();
	}

	// El método que anima al gato
	clatter() {
		if (!this.imgElement) return;

		// 1. Limpiamos TODOS los timers activos al escribir
		this.clearAllTimers();

		// 2. Cambiamos solo entre las 2 imágenes de trabajo
		this.currentIndex = (this.currentIndex + 1) % WORK_IMAGES.length;
		this.imgElement.src = WORK_IMAGES[this.currentIndex] as string;

		// 3. Primer Timeout: A 1 segundo regresa a Both-Up
		this.idleTimer = window.setTimeout(() => {
			if (this.imgElement) {
				this.imgElement.src = IDLE_UP;
				// Iniciamos el segundo timer de 10 segundos
				this.startDeepIdleTimer();
			}
		}, 1000);
	}

	private startDeepIdleTimer() {
		// A los 5 segundos de estar en "Both-Up", pasa a "Both-Down"
		this.deepIdleTimer = window.setTimeout(() => {
			if (this.imgElement) {
				this.imgElement.src = IDLE_DOWN;
			}
		}, 5000);
	}

	private clearAllTimers() {
		if (this.idleTimer) window.clearTimeout(this.idleTimer);
		if (this.deepIdleTimer) window.clearTimeout(this.deepIdleTimer);
		this.idleTimer = null;
		this.deepIdleTimer = null;
	}

	async onClose() {
		this.clearAllTimers();
	}
}
