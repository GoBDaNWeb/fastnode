import { Suspense, lazy } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Preloader from '@Shared/ui/preloader';

import { RequireAuth, RequireExited } from '@hoc/RequireAuth';

const GlobalOut = lazy(() => import('@out/global'));
const HomePage = lazy(() => import('@Pages/HomePage'));
const ForgotPage = lazy(() => import('@Pages/Auth/ForgotPage'));
const LoginPage = lazy(() => import('@Pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('@Pages/Auth/SignupPage'));
const ConfiguratorPage = lazy(() => import('@Pages/Office/ConfiguratorPage'));
const DashboardPage = lazy(() => import('@Pages/Office/DashboardPage'));
const InvoicesPage = lazy(() => import('@Pages/Office/InvoicesPage'));
const PersonalPage = lazy(() => import('@Pages/Office/PersonalPage'));
const StatsPage = lazy(() => import('@Pages/Office/StatsPage'));
const NodesPage = lazy(() => import('@Pages/Nodes/NodesPage'));
const FullNodePage = lazy(() => import('@Pages/Nodes/FullNodePage'));

const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={
				<Suspense fallback={<Preloader fullScreen={true} size={9} />}>
					<GlobalOut />
				</Suspense>
			}
		>
			<Route index element={<HomePage titleLocale='home' />} />

			<Route
				path='login'
				element={
					<RequireExited>
						<LoginPage titleLocale='login' />
					</RequireExited>
				}
			/>
			<Route
				path='forgot'
				element={
					<RequireExited>
						<ForgotPage titleLocale='forgot' />
					</RequireExited>
				}
			/>
			<Route
				path='signup'
				element={
					<RequireExited>
						<SignupPage titleLocale='signup' />
					</RequireExited>
				}
			/>

			<Route
				path='personal'
				element={
					<RequireAuth>
						<PersonalPage titleLocale='personal' />
					</RequireAuth>
				}
			/>
			<Route
				path='configurator'
				element={
					<RequireAuth>
						<ConfiguratorPage titleLocale='configurator' />
					</RequireAuth>
				}
			/>
			<Route
				path='invoices'
				element={
					<RequireAuth>
						<InvoicesPage titleLocale='invoices' />
					</RequireAuth>
				}
			/>
			<Route
				path='dashboard'
				element={
					<RequireAuth>
						<DashboardPage titleLocale='dashboard' />
					</RequireAuth>
				}
			></Route>
			<Route
				path='/dashboard/node'
				element={
					<RequireAuth>
						<StatsPage title='node' />
					</RequireAuth>
				}
			/>
			<Route path='nodes' element={<NodesPage title='Nodes' />} />
			<Route path='nodes/:nodeId' element={<FullNodePage title='Nodes' />} />

			<Route path='*' element={<HomePage />} />
		</Route>
	)
);

export default Router;
