import { defineConfig } from "vite";
import { resolve } from 'path';
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import uni from "@dcloudio/vite-plugin-uni";
import Components from '@uni-helper/vite-plugin-uni-components'

export default defineConfig(async() => {
	const UnoCss = await import('unocss/vite').then(i => i.default)
	return {
		plugins: [
			// make sure put it before `Uni()`
			Components({
					resolvers: [WotResolver()]
			}), 
			uni(),
			UnoCss()
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				'@components': resolve(__dirname, './src/components/'),
			},
		}
	}
});
