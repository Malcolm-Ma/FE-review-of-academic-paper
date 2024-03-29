/**
 * @file useFormValue hook
 * @author Mingze Ma
 */
import {useCallback, useEffect, useMemo, useState} from "react";
import _ from "lodash";

interface useFormValueProps {
  valueIndex?: number,
  initialValue?: any,
  valueFromEvent?: boolean,
  debug?: boolean,
  formatValue?: (value: any) => any
}

const useFormValue = (props: useFormValueProps = {}) => {

  const { valueIndex = 1, initialValue = '', debug, valueFromEvent, formatValue } = props;

  const [value, setValue] = useState<any>(initialValue);

  const handleChange = useCallback((...args: any) => {
    debug && console.log('--args--\n', args);
    if (!_.isNumber(valueIndex)) {
      throw new Error("Invalid value index");
    }
    if (valueFromEvent) {
      setValue(args[0].target.value);
      return;
    }
    if (formatValue) {
      const newValue = formatValue(args[valueIndex]);
      setValue(newValue);
      return;
    }
    setValue(args[valueIndex]);
  }, [debug, formatValue, valueFromEvent, valueIndex]);

  const formProps = useMemo(() => ({
    value,
    onChange: handleChange
  }), [handleChange, value]);

  useEffect(() => {
    debug && console.log('--value--\n', value);
  }, [debug, value]);

  return [value, handleChange, formProps];
};

export default useFormValue;
