import { App, PluginSettingTab, Setting } from "obsidian";
import BongoCatPlugin from "./main";

export interface BongoCatSettings {
    mySetting: string;
}

export const DEFAULT_SETTINGS: BongoCatSettings = {
    mySetting: 'default'
}

export class BongoCatSettingTab extends PluginSettingTab {
    plugin: BongoCatPlugin;

    constructor(app: App, plugin: BongoCatPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Settings 1')
            .setDesc('It is a secret')
            .addText(text => text
                .setPlaceholder('Enter your secret')
                .setValue(this.plugin.settings.mySetting)
                .onChange(async (value) => {
                    this.plugin.settings.mySetting = value;
                    await this.plugin.saveSettings();
                }));
    }
}
