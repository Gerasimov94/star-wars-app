import { notification } from 'antd';

export const showNotification = ({
	message,
	description,
	type,
}: {
	message: string;
	description: string;
	type: 'error' | 'success';
}) => {
	notification.open({ message, description, type });
};

export const showErrorNotification = () =>
	showNotification({
		type: 'error',
		message: 'Only a Sith Deals in Absolutes...',
		description: 'Something went wrong. Please, reload page',
	});
