import { notification } from 'antd';

export const showNotification = ({ message, description, type }: { message: string; description: string; type: 'error' | 'success' }) => {
	notification.open({ message, description, type });
};

export const showErrorNotification = () =>
	showNotification({
		type: 'error',
		message: 'Only a Sith Deals in Absolutes...',
		description: 'Something went wrong. Please, reload page',
	});

export const debounce = (callback: (params: any) => any, wait: number) => {
	let timeoutId: number | undefined;
	return (...args: any) => {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			// eslint-disable-next-line prefer-spread
			callback.apply(null, args);
		}, wait);
	};
};

export const getIDFromURL = (url: string) => Number(new URL(url).pathname.replace(/\D/g, ''));
