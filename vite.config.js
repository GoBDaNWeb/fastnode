// import babelCore from '@babel/core';
// import nullishCoalescingOperator from '@babel/plugin-proposal-nullish-coalescing-operator';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';

const resolvePath = p => path.resolve(__dirname, p);
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [autoprefixer({})]
		},
		preprocessorOptions: {
			scss: {
				additionalData: `
			  @use "sass:math";
			  @use "sass:color";
			  @import "src/app/template/config/layout.config.scss";
			  @import "src/app/template/common/_init.scss";
			  @import "src/components/07_Shared/ui/icon/mixins/iconf.mixins.scss";
			  @import "src/components/07_Shared/ui/icon/mixins/iconsvg.mixins.scss";
			  @import "src/components/07_Shared/ui/decorator/mixins/decorators.mixins.scss";
			  @import "src/components/07_Shared/ui/framedbox/framedbox.mixins.scss";
			  @import "src/components/07_Shared/ui/misc/permanent.mixins.scss";
				${process.env.NODE_ENV !== 'production' ? `@import "src/utils/development/scss/dev-utils.scss";` : ''}
			`
			}
		}
	},
	resolve: {
		alias: {
			'@assets': resolvePath('./src/assets'),

			'@api': resolvePath('./src/api'),
			'@redux': resolvePath('./src/api/redux'),
			'@app': resolvePath('./src/app'),
			'@out': resolvePath('./src/app/Out'),
			'@template': resolvePath('./src/app/template'),
			'@contents': resolvePath('./src/app/Contents'),
			'@router': resolvePath('./src/app/Router'),

			'@Pages': resolvePath('./src/components/03_Pages'),
			'@Widgets': resolvePath('./src/components/04_Widgets'),
			'@Features': resolvePath('./src/components/05_Features'),
			'@Entities': resolvePath('./src/components/06_Entities'),
			'@Shared': resolvePath('./src/components/07_Shared'),

			'@config': resolvePath('./src/config'),
			'@data': resolvePath('./src/data'),
			'@extra': resolvePath('./src/extra'),
			'@js': resolvePath('./src/extra/js'),
			'@hoc': resolvePath('./src/hoc'),
			'@hooks': resolvePath('./src/hooks'),
			'@locales': resolvePath('./src/locales'),
			'@utils': resolvePath('./src/utils'),

			'@fonts': resolvePath('./public/fonts'),
			'@iconfonts': resolvePath('./public/iconfonts'),
			'@images': resolvePath('./public/images'),

			'@package.json': resolvePath('./package.json')
		}
	}
});
