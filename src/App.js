import { Button, Card, DataTable, Form, FormLayout, Heading, Page, Tag } from "@shopify/polaris";
import { useFieldArray, useForm } from "react-hook-form";
import './App.css';
import { ControlledSelectField } from "./components/ControlledSelectField";
import { ControlledTextField } from "./components/ControlledTextField";

const defaultValues = {
  general: {
    campaign: '',
    title: '',
    description: ''
  },
  volumnDiscountRules: [
    { title: '', subtitle: '', label: '', quantity: 0, discountType: '', amount: 0 }
  ],
}

export default function PolarisForm() {
  const { control, getValues, handleSubmit, watch } = useForm({
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    name: "volumnDiscountRules",
    control
  });

  watch("volumnDiscountRules");

  const renderRaws = () => {
    return getValues("volumnDiscountRules")
      .map(discountRule => [
        discountRule.title,
        discountRule.discountType,
        discountRule.quantity,
        discountRule.amount
      ])
  }

  const getAmountSuffix = (discountType) => {
    return discountType !== "" ? discountType : "";
  }

  const handleAddOption = () => {
    append({ title: '', subtitle: '', label: '', quantity: 0, discountType: '', amount: 0 })
  }

  return (
    <Page
      breadcrumbs={[{ content: "Products", url: "/products" }]}
      title="Add Product"
    >
      <div className="w-1000 display-flex">
        <div className="w-500">
          <Form>
            {/*******************
                General 
            ********************/}
            <Card sectioned>
              <Heading children={<div className="mb-3">General</div>} />
              <FormLayout >
                <ControlledTextField
                  control={control}
                  type={"text"}
                  label={"name"}
                  name={"general.campaign"}
                  rules={{
                    required: "required"
                  }}
                />
                <ControlledTextField
                  control={control}
                  type={"text"}
                  label={"name"}
                  name={"general.title"}
                />
                <ControlledTextField
                  control={control}
                  type={"text"}
                  label={"name"}
                  name={"general.description"}
                />
              </FormLayout>
            </Card>

            {/*******************
            Volumn discount rule
          ********************/}
            <Card sectioned>
              <Heading children={<div className="mb-3">Volumn discount rule
                <hr />

              </div>} />
              {fields.map((item, index) => {
                const discountType = getValues(`volumnDiscountRules.${index}.discountType`);
                return (
                  <div key={item.id}>
                    <Tag children={`Option ${index + 1}`} />
                    <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "30% 30% 30%" }}>
                      <ControlledTextField
                        control={control}
                        type={"text"}
                        label={"title"}
                        rules={{
                          required: "required"
                        }}
                        name={`volumnDiscountRules.${index}.title`} />
                      <ControlledTextField
                        control={control}
                        type={"text"}
                        label={"subtitle"}
                        name={`volumnDiscountRules.${index}.subtitle`} />
                      <ControlledTextField
                        control={control}
                        type={"text"}
                        label={"label (optional)"}
                        name={`volumnDiscountRules.${index}.label`} />
                      <ControlledTextField
                        control={control}
                        type={"text"}
                        label={"subtitle"}
                        name={`volumnDiscountRules.${index}.quantity`} />
                      <ControlledSelectField
                        options={[
                          { label: 'None', value: '' },
                          { label: '% discount', value: '%' },
                          { label: 'Discount / each', value: '$' },
                        ]}
                        control={control}
                        type={"text"}
                        label={"discountType"}
                        name={`volumnDiscountRules.${index}.discountType`} />
                      {
                        discountType && <ControlledTextField
                          suffix={getAmountSuffix(discountType)}
                          control={control}
                          type={"number"}
                          label={"amount"}
                          name={`volumnDiscountRules.${index}.amount`} />
                      }
                    </div>
                    <hr className="" />
                  </div>
                )
              })}
            </Card>

            <div className="mt-3">
              <Button onClick={handleAddOption}>Add option</Button>
            </div>
          </Form>
        </div>

        <div className="w-500">
          <Card sectioned>
            <Heading children={<div className="mb-3">Review</div>} />
            <DataTable
              hideScrollIndicator={true}
              columnContentTypes={[
                'text',
                'text',
                'numeric',
                'numeric',
              ]}
              headings={[
                'Title',
                'Discount type',
                'Quantity',
                'Amount',
              ]}
              rows={renderRaws()}
            />
          </Card>
        </div>
      </div>
    </Page>
  );
}