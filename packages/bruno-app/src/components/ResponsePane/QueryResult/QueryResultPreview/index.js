import CodeEditor from 'components/CodeEditor/index';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequest } from 'providers/ReduxStore/slices/collections/actions';
import { Document, Page } from 'react-pdf';
import { useState } from 'react';
import 'pdfjs-dist/build/pdf.worker';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

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
const QueryResultPreview = ({
  previewTab,
  allowedPreviewModes,
  data,
  dataBuffer,
  formattedData,
  item,
  contentType,
  collection,
  mode,
  disableRunEventListener,
  displayedTheme
}) => {
  const preferences = useSelector((state) => state.app.preferences);
  const dispatch = useDispatch();

  const [numPages, setNumPages] = useState(null);
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
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  // Fail safe, so we don't render anything with an invalid tab
  if (!allowedPreviewModes.includes(previewTab)) {
    return null;
  }

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
  const onRun = () => {
    if (disableRunEventListener) {
      return;
    }
    dispatch(sendRequest(item, collection.uid));
  };

  switch (previewTab) {
    case 'preview-web': {
      const webViewSrc = data.replace('<head>', `<head><base href="${item.requestSent?.url || ''}">`);
      return (
        <webview
          src={`data:text/html; charset=utf-8,${encodeURIComponent(webViewSrc)}`}
          webpreferences="disableDialogs=true, javascript=yes"
          className="h-full bg-white"
        />
      );
    }
    case 'preview-image': {
      return <img src={`data:${contentType.replace(/\;(.*)/, '')};base64,${dataBuffer}`} className="mx-auto" />;
    }
    case 'preview-pdf': {
      return (
        <div className="preview-pdf" style={{ height: '100%', overflow: 'auto', maxHeight: 'calc(100vh - 220px)' }}>
          <Document file={`data:application/pdf;base64,${dataBuffer}`} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} renderAnnotationLayer={false} />
            ))}
          </Document>
        </div>
      );
    }
    default:
    case 'raw': {
      return (
        <CodeEditor
          collection={collection}
          font={get(preferences, 'font.codeFont', 'default')}
          theme={displayedTheme}
          onRun={onRun}
          value={formattedData}
          mode={mode}
          readOnly
        />
      );
    }
  }
};

export default QueryResultPreview;
