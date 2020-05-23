import React from "react";
import "./ProductList.css";
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBView, MDBCardTitle, MDBCardBody, MDBCardText, MDBIcon, MDBBtn } from "mdbreact";

const ProductList = () => (
  <div>
    <MDBRow>
      <MDBCol md='2'>
        <MDBCard wide cascade>
          <MDBView cascade>
          
          <i class="fa fa-mobile fa-9x" aria-hidden="true"></i>
      
          </MDBView>

          <MDBCardBody cascade className='text-center'>
            <MDBCardTitle className='card-title'>
              <strong>Alice Mayer</strong>
            </MDBCardTitle>

            <p className='font-weight-bold blue-text'>Photographer</p>

            <MDBCardText>
              Sed ut perspiciatis unde omnis iste natus sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.{' '}
            </MDBCardText>

            <MDBCol md='12' className='d-flex justify-content-center'>
              <a href='!#' className='px-2 fa-lg li-ic'>
                <MDBIcon fab icon='linkedin-in'></MDBIcon>
              </a>

              <a href='!#' className='px-2 fa-lg tw-ic'>
                <MDBIcon fab icon='twitter'></MDBIcon>
              </a>

              <a href='!#' className='px-2 fa-lg fb-ic'>
                <MDBIcon fab icon='facebook-f'></MDBIcon>
              </a>
            </MDBCol>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md='2'>
        <MDBCard wide cascade>
          <MDBView cascade>
          
          <i class="fa fa-mobile fa-9x" aria-hidden="true"></i>
      
          </MDBView>

          <MDBCardBody cascade className='text-center'>
            <MDBCardTitle className='card-title'>
              <strong>Alice Mayer</strong>
            </MDBCardTitle>

            <p className='font-weight-bold blue-text'>Photographer</p>

            <MDBCardText>
              Sed ut perspiciatis unde omnis iste natus sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.{' '}
            </MDBCardText>

            <MDBCol md='12' className='d-flex justify-content-center'>
              <a href='!#' className='px-2 fa-lg li-ic'>
                <MDBIcon fab icon='linkedin-in'></MDBIcon>
              </a>

              <a href='!#' className='px-2 fa-lg tw-ic'>
                <MDBIcon fab icon='twitter'></MDBIcon>
              </a>

              <a href='!#' className='px-2 fa-lg fb-ic'>
                <MDBIcon fab icon='facebook-f'></MDBIcon>
              </a>
            </MDBCol>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </div>
);

export default ProductList;
