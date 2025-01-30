export interface AddCoverProps {
    methods?: UseFormReturn<CourseFormData>; 
    onSubmit?: (e?: BaseSyntheticEvent) => Promise<void>; //
    isLanguagesLoading?: boolean;
    languages?: any; 
    isRanksLoading?: boolean;
    ranks?: any; 
    setValue?: UseFormSetValue<CourseFormData>;
    errors: Record<string, any>;
    isSubmitting?: boolean;
    courseItems?: any;
  }
  export interface AddContentProps {
    courseId?: string | null;
  isEditMode?: boolean;
  }
  export type SelectedItem = {
    contentId?: string | number;
    title?: string;
    contentState?: number; 
  };
  
  export type SelectedItemProps = {
    item?: SelectedItem;
    setSelectedItems: Dispatch<SetStateAction<SelectedItemProps[]>>,
    getCurrentTime: () => string;
    theme: Theme;
    t: (key: string) => string;
    contentId?: string;
  };
  
  export type CourseItemType = {
    contentId?: string;
    title?: string;
    ownerName?: string;
    contentState?: number;
 };
 
  
  export  interface ContentRepositoryModalProps {
    open: boolean;
    handleOpen: () => void;
    selectedItems?: CourseItemType[];
    setSelectedItems: Dispatch<SetStateAction<CourseItemType[]>>;
}
 export  type CourseItemType = {
    contentId: string;
    title: string;
    ownerName: string;
    contentState: number;
  };
  