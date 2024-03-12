import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'components/Modal';
import { useDispatch } from 'react-redux';
import { isItemAFolder } from 'utils/tabs';
import { renameItem } from 'providers/ReduxStore/slices/collections/actions';

/**
 * Transforms the sign-up request data to match the backend's expected format.
 * 
 * @param {SignUpRequest} signUpData - The original sign-up request data.
 * 
 * @returns {Object} The transformed sign-up request data with the following changes:
 * - `firstName` is mapped to `first_name`
 * - `lastName` is mapped to `last_name`
 * - `email` is mapped to `username`
 * - All other properties remain unchanged.
 * 
 * @example
 * const originalData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 * 
 * const transformedData = transformSignUpRequestForBackend(originalData);
 * console.log(transformedData);
 * // Outputs:
 * // {
 * //   firstName: 'John',
 * //   lastName: 'Doe',
 * //   email: 'john.doe@example.com',
 * //   password: 'securePassword123',
 * //   first_name: 'John',
 * //   last_name: 'Doe',
 * //   username: 'john.doe@example.com'
 * // }
 */
const RenameCollectionItem = ({ collection, item, onClose }) => {
  const dispatch = useDispatch();
  const isFolder = isItemAFolder(item);
  const inputRef = useRef();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: item.name
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, 'must be at least 1 character')
        .max(50, 'must be 50 characters or less')
        .required('name is required')
    }),
    onSubmit: (values) => {
      dispatch(renameItem(values.name, item.uid, collection.uid));
      onClose();
    }
  });

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  /**
   * Transforms the sign-up request data to match the backend's expected format.
   * 
   * @param {SignUpRequest} signUpData - The original sign-up request data.
   * 
   * @returns {Object} The transformed sign-up request data with the following changes:
   * - `firstName` is mapped to `first_name`
   * - `lastName` is mapped to `last_name`
   * - `email` is mapped to `username`
   * - All other properties remain unchanged.
   * 
   * @example
   * const originalData = {
   *   firstName: 'John',
   *   lastName: 'Doe',
   *   email: 'john.doe@example.com',
   *   password: 'securePassword123'
   * };
   * 
   * const transformedData = transformSignUpRequestForBackend(originalData);
   * console.log(transformedData);
   * // Outputs:
   * // {
   * //   firstName: 'John',
   * //   lastName: 'Doe',
   * //   email: 'john.doe@example.com',
   * //   password: 'securePassword123',
   * //   first_name: 'John',
   * //   last_name: 'Doe',
   * //   username: 'john.doe@example.com'
   * // }
   */
  const onSubmit = () => formik.handleSubmit();

  return (
    <Modal
      size="sm"
      title={`Rename ${isFolder ? 'Folder' : 'Request'}`}
      confirmText="Rename"
      handleConfirm={onSubmit}
      handleCancel={onClose}
    >
      <form className="bruno-form" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name" className="block font-semibold">
            {isFolder ? 'Folder' : 'Request'} Name
          </label>
          <input
            id="collection-item-name"
            type="text"
            name="name"
            ref={inputRef}
            className="block textbox mt-2 w-full"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.name || ''}
          />
          {formik.touched.name && formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
        </div>
      </form>
    </Modal>
  );
};

export default RenameCollectionItem;
