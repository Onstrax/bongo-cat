import { ItemView, WorkspaceLeaf } from "obsidian";
import { BongoCatSettings } from "./settings";

export const VIEW_TYPE_BONGO_CAT = "bongo-cat-view";

export class BongoCatView extends ItemView {
	private imgElement: HTMLImageElement | null = null;
	private currentIndex = 0;
	private idleTimer: number | null = null;
	private deepIdleTimer: number | null = null;

	constructor(
		leaf: WorkspaceLeaf,
		private settings: BongoCatSettings,
	) {
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

	async onOpen(): Promise<void> {
		const container = this.containerEl.children[1];
		if (!(container instanceof HTMLElement)) {
			await Promise.resolve();
			return;
		}

		container.empty();
		const catContainer = container.createDiv({ cls: "bongo-container" });

		this.imgElement = catContainer.createEl("img", {
			attr: {
				src: this.settings.imgIdleUp,
				id: "bongo-cat-img",
			},
		});

		this.imgElement.setCssStyles({
			width: `${this.settings.catSize}px`,
			height: "auto",
		});

		this.startDeepIdleTimer();
		await Promise.resolve();
	}

	updateView() {
		if (!this.imgElement) return;

		// 1. Actualizar el tamaño
		this.imgElement.setCssStyles({
			width: `${this.settings.catSize}px`,
			height: "auto",
		});

		// 2. Actualizar la imagen actual (por si cambió el sprite de IDLE_UP)
		// Solo lo cambiamos si el gato no está en medio de una animación de tecleo
		if (!this.idleTimer) {
			this.imgElement.src = this.settings.imgIdleUp;
		}
	}

	// El método que anima al gato
	clatter() {
		if (!this.imgElement) return;
		this.clearAllTimers();

		// Creamos el array de trabajo dinámicamente con los settings actuales
		const WORK_IMAGES = [
			this.settings.imgLeftDown,
			this.settings.imgRightDown,
		];
		this.currentIndex = (this.currentIndex + 1) % WORK_IMAGES.length;
		const nextSrc = WORK_IMAGES[this.currentIndex];
		if (nextSrc) {
			this.imgElement.src = nextSrc;
		}

		this.idleTimer = window.setTimeout(() => {
			if (this.imgElement) {
				this.imgElement.src = this.settings.imgIdleUp;
				this.startDeepIdleTimer();
			}
		}, this.settings.idleTimeout * 1000);
	}

	private startDeepIdleTimer() {
		this.deepIdleTimer = window.setTimeout(() => {
			if (this.imgElement) {
				this.imgElement.src = this.settings.imgIdleDown;
			}
		}, this.settings.deepIdleTimeout * 1000);
	}

	private clearAllTimers() {
		if (this.idleTimer) window.clearTimeout(this.idleTimer);
		if (this.deepIdleTimer) window.clearTimeout(this.deepIdleTimer);
		this.idleTimer = null;
		this.deepIdleTimer = null;
	}

	async onClose(): Promise<void> {
		this.clearAllTimers();
		await Promise.resolve();
	}
}
