import React from 'react'
import {Label} from '../ui/label'
import {Input} from '../ui/input'
import {Textarea} from '../ui/textarea'
import {Select} from '../ui/select'
import {Button} from '../ui/button'
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'

function CommonForm({formControls, formData, setFormData, onSubmit, buttonText,isBtnDisabled}) {
  const renderInputsByComponentType = (controlItem) => {
    let element = null;
    const value = formData[controlItem.name] || '';


    switch(controlItem.componentType) {
      case 'input':
        element = <Input 
          name = {controlItem.name}
          type = {controlItem.inputType}
          placeholder = {controlItem.placeholder}
          id = {controlItem.name}
          value = {value}
          onChange ={ (e)=>setFormData({
            ...formData,
            [controlItem.name] : e.target.value
          }
          )
        }
          
          />
        break;
        case "select":
          element = (
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  [controlItem.name]: value,
                })
              }
              value={value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={controlItem.label} />
              </SelectTrigger>
              <SelectContent>
                {controlItem.options && controlItem.options.length > 0
                  ? controlItem.options.map((optionItem) => (
                      <SelectItem key={optionItem.id} value={optionItem.id}>
                        {optionItem.label}
                      </SelectItem>
                    ))
                  : null}
              </SelectContent>
            </Select>
          );
  
          break;
      case "textarea":
        element = <Textarea 
          name = {controlItem.name}
          placeholder = {controlItem.placeholder}
          id = {controlItem.name}
          value = {value}
          onChange ={ (e)=>setFormData({
            ...formData,
            [controlItem.name] : e.target.value
          }
          )
        }
          />
        break;
      case "checkbox":
        element = <Input 
          name = {controlItem.name}
          type = {controlItem.inputType}
          placeholder = {controlItem.placeholder}
          id = {controlItem.name}
          />
        break;
      case "radio":
        element = <Input 
          name = {controlItem.name}
          type = {controlItem.inputType}
          placeholder = {controlItem.placeholder}
          id = {controlItem.name}
          />
        break;
      default:
        element = <Input 
          name = {controlItem.name}
          type = {controlItem.inputType}
          placeholder = {controlItem.placeholder}
          id = {controlItem.name}
          onChange ={ (e)=>setFormData({
            ...formData,
            [controlItem.name] : e.target.value
          }
          )
        }
          />
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className = "flex flex-col gap-3">
          {formControls.map(controlItem => (
            <div className='grid w-full gap-1.5' key={controlItem.name}>
              <Label className='mb-1'>
                {controlItem.label}
              </Label>
              {
                renderInputsByComponentType(controlItem)
              }
            </div>
          ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className='mt-2 w-full'>
        {buttonText || 'submit'}
      </Button>
    </form>
  )
}

export default CommonForm
