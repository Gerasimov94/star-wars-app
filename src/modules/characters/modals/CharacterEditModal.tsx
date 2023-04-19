/* eslint-disable no-nested-ternary */
import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useCallback, useEffect } from 'react';
import { ICharacter } from 'src/common/types';
import { capitalize } from 'src/helpers';
import { useAppDispatch } from 'src/hooks';
import { updateCharacters } from 'src/modules/characters/slice';

interface IProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
	character: ICharacter;
}

export default function CharacterEditModal({ setIsOpen, isOpen, character }: IProps) {
	const [form] = useForm<Partial<ICharacter>>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isOpen) {
			form.resetFields();
			setIsOpen(false);
		}

		return () => {
			form.resetFields();
		};
	}, [isOpen, character]);

	const onSave = useCallback(() => {
		form
			.validateFields()
			.then(async (data) => {
				dispatch(updateCharacters({ ...data, url: character.url }));

				setIsOpen(false);
			})
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			.catch(() => {});
	}, []);

	console.log(character);

	return (
		<Modal
			forceRender
			title={character.name}
			open={isOpen}
			width={572}
			onCancel={() => {
				setIsOpen(false);
			}}
			footer={[
				<Button form="add-version-form" key="save" type="primary" htmlType="submit" loading={false} onClick={onSave}>
					Edit
				</Button>,
				<Button
					key="cancel"
					onClick={() => {
						setIsOpen(false);
					}}
				>
					Cancel
				</Button>,
			]}
		>
			<Form id="character-edit-form" name="form" form={form} initialValues={character} layout="vertical" preserve={false}>
				{['name', 'height', 'mass'].map((field) => {
					const label = capitalize(field);

					return (
						<Form.Item
							key={field}
							name={field}
							label={label}
							rules={[
								{
									required: true,
									message: `${label} must be filled`,
								},
							]}
						>
							<Input />
						</Form.Item>
					);
				})}
			</Form>
		</Modal>
	);
}
