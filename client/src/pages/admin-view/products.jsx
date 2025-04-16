import { Fragment, use, useState } from "react"; // Import useState
import { Button } from "../../components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../../store/admin/product-slice";
import { useEffect } from "react";
import { addProduct } from "../../store/admin/product-slice";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";
import { editProduct } from "@/store/admin/product-slice";
import { deleteProduct } from "@/store/admin/product-slice";



function AdminProducts() {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: ""
  });
  const initialState = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: ""
  };

  const [imagefile , setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const {toast} = useToast();
  function onSubmit(e) {
    e.preventDefault();
    currentEditedId !== null ?
    dispatch(editProduct({
      id: currentEditedId,
      formData,
    })).then((data) => {
      console.log(data);
      // i can also update the productList in redux store or else fetch the productList again
      // and update the productList in redux store
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setFormData(initialState);
        setOpenCreateProduct(false);
        setCurrentEditedId(null);
      }
      }) :
    dispatch(addProduct({
      ...formData,
      image: uploadedImage
    })).then((res) => {
      console.log(res);
      if (res?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProduct(false);
        setFormData(initialState);
        toast({
          title: "Product added successfully",
          description: "Product added successfully",
          action: <Button variant="outline" onClick={() => setOpenCreateProduct(true)}>View</Button>
        });
        // setFormData(initialState);
        setImageFile(null);
        setUploadedImage('');

      }
      else {
        alert("Product upload failed");
      }
    });

  }
  // function handleDeleteProduct(id) {
  //   dispatch(deleteProduct(id)).then((data) => {
  //     console.log(data);
  //     if (data?.payload?.success) {
  //       dispatch(fetchAllProducts());
  //       toast({
  //         title: "Product deleted successfully",
  //         description: "Product deleted successfully",
  //         action: <Button variant="outline" onClick={() => setOpenCreateProduct(true)}>View</Button>
  //       });
  //     }
  //   });
  // }
  function handleDelete(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product deleted successfully",
          description: "Product deleted successfully",
          action: <Button variant="outline" onClick={() => setOpenCreateProduct(true)}>View</Button>
        });
      }
    });
  }


  function isFormValid(){
    return Object.keys(formData).map((key) => 
      formData[key] !== "").every((item)=>item);
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log("product-list",uploadedImage, productList);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => {
            setOpenCreateProduct(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
          productList.map(productItem=> <AdminProductTile setFormData={setFormData} setOpenCreateProduct={setOpenCreateProduct} setCurrentEditedId={setCurrentEditedId} product={productItem} handleDelete={handleDelete}/>) : null
        }
      </div>
      <Sheet open={openCreateProduct} onOpenChange={()=>{
        setOpenCreateProduct(false);
        setFormData(initialState);
        setImageFile(null);
        setUploadedImage('');
        setCurrentEditedId(null);
      }}>
        <SheetContent side="right" className="overflow-auto" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? "Edit Product" : "Add New Product"
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload 
          file={imagefile} 
          setFile={setImageFile} 
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          imageLoadingState={imageLoadingState}
          setImageLoadingState={setImageLoadingState}
          isEditMode={currentEditedId !== null} 
          />
          <div className="py-6">
            <CommonForm formData={formData} 
            setFormData={setFormData} 
            formControls={addProductFormElements}
            buttonText={ currentEditedId !== null ? "Edit Product" : "Add Product"}
            onSubmit={onSubmit}
            isBtnDisabled = {!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;