import React, { useState } from "react";
import { FileUpload } from "../components/pages/sell/FileUpload";
import { PageContainer } from "../components/shared/containers/PageContainer";

export const Sell = () => {
  return (
    <PageContainer>
      <FileUpload />
    </PageContainer>
  );
};
