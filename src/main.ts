import { Plugin, WorkspaceLeaf } from "obsidian";
import { BongoCatView, VIEW_TYPE_BONGO_CAT } from "./view";
import {
	BongoCatSettings,
	DEFAULT_SETTINGS,
	BongoCatSettingTab,
} from "./settings";

export default class BongoCatPlugin extends Plugin {
	settings: BongoCatSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(
			VIEW_TYPE_BONGO_CAT,
			(leaf) => new BongoCatView(leaf, this.settings), // Pasamos las settings aquí
		);

		// 3. Añadimos la pestaña de ajustes
		this.addSettingTab(new BongoCatSettingTab(this.app, this));

		// Comando para abrir la vista
		this.addCommand({
			id: "open-view",
			name: "Open bongo cat",
			callback: () => {
				void this.activateView();
			},
		});

		// Icono en la barra lateral
		this.addRibbonIcon("cat", "Bongo cat", () => {
			void this.activateView();
		});

		// EVENTO: Aquí es donde conectamos el teclado con el gato
		this.registerEvent(
			this.app.workspace.on("editor-change", () => {
				this.animateBongoCat();
			}),
		);
	}

	animateBongoCat() {
		const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_BONGO_CAT);
		leaves.forEach((leaf) => {
			if (leaf.view instanceof BongoCatView) {
				leaf.view.clatter();
			}
		});
	}

	async activateView() {
		const { workspace } = this.app;

		// 1. Cambiamos 'null' por 'undefined' para que coincida con lo que devuelve el array [0]
		let leaf: WorkspaceLeaf | undefined =
			workspace.getLeavesOfType(VIEW_TYPE_BONGO_CAT)[0];

		if (!leaf) {
			// getRightLeaf(false) puede devolver null, así que usamos una validación
			const rightLeaf = workspace.getRightLeaf(false);
			if (!rightLeaf) return;

			leaf = rightLeaf;
			await leaf.setViewState({
				type: VIEW_TYPE_BONGO_CAT,
				active: true,
			});
		}

		// 3. Importante: Usamos await aquí también para resolver la Promesa
		if (leaf) {
			await workspace.revealLeaf(leaf);
		}
	}

	async loadSettings() {
		// Usamos 'as BongoCatSettings' para decirle a TS que confíe en que los datos tienen esa estructura
		const data = (await this.loadData()) as BongoCatSettings;
		this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
