<?php

namespace App\Controller;

use App\Repository\WorkerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

class WorkerController extends AbstractController
{
    private $workerRepository;
    private $helper;

    public function __construct(WorkerRepository $workerRepository, UploaderHelper $helper)
    {
        $this->workerRepository = $workerRepository;    
        $this->helper = $helper;
    }


    /**
     * @Route("/api/workers/photo/{id}", name="add_worker_photo", methods={"POST"})
     */    
    public function addPhoto($id, Request $request) : JsonResponse
    {
        $worker = $this->workerRepository->findOneBy(['id' => $id]);
        $file = $request->files->get('photoFile');
        
        if (!$worker)
            throw $this->createNotFoundException('Unable to find Worker.');

        $worker->setPhotoFile($file);
        $worker = $this->workerRepository->updateWorker($worker);

        $path = $this->helper->asset($worker);

        $data = [
            'id' => $worker->getId(),
            'name' => $worker->getName(),
            'birthdate' => $worker->getBirthdate()->format('d//m/Y'),
            'address' => $worker->getAddress(),
            'phone' => $worker->getPhone(),
            'email' => $worker->getEmail(),
            'dniNumber' => $worker->getDniNumber(),
            'deparment' => $worker->getDeparment(),
            'photoFile' => $path,
        ];

        return new JsonResponse($data, JsonResponse::HTTP_OK);
    }


    /**
     * @Route("/api/workers", name="add_worker", methods={"POST"})
     */
    public function addWorker(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $name = $data['name'];
        $birthdate = \DateTime::createFromFormat('d/m/Y', $data['birthdate']);
        $address = $data['address'];
        $phone = $data['phone'];
        $email = $data['email'];
        $dniNumber = $data['dniNumber'];
        $deparment = $data['deparment'];

        $repetedDni = $this->workerRepository->findOneBy(['dniNumber' => $dniNumber]);
        if ($repetedDni)
            return new JsonResponse(['status' => 'DNI number already present'], JsonResponse::HTTP_BAD_REQUEST);
        
        $newWorker = $this->workerRepository->saveWorker($name, $birthdate, $address, $phone, $email, $dniNumber, $deparment);            

        //return the ID to add a photo later (if any)
        return new JsonResponse(['id' =>  $newWorker->getId()], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/api/workers/{id}", name="get_one_worker", methods={"GET"})
     */
    public function getById($id): JsonResponse
    {
        $worker = $this->workerRepository->find($id);
        
        $path = $this->helper->asset($worker);

        if (!$worker)
            throw $this->createNotFoundException('Unable to find Worker.');

        $data = [
            'id' => $worker->getId(),
            'name' => $worker->getName(),
            'birthdate' => $worker->getBirthdate()->format('d//m/Y'),
            'address' => $worker->getAddress(),
            'phone' => $worker->getPhone(),
            'email' => $worker->getEmail(),
            'dniNumber' => $worker->getDniNumber(),
            'deparment' => $worker->getDeparment(),
            'photoFile' => $path,
        ];

        return new JsonResponse($data, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/api/workers", name="get_all_workers", methods={"GET"})
     */
    public function getAll(): JsonResponse
    {
        $workers = $this->workerRepository->findAll();
        
        $data = [];

        foreach ($workers as $worker) {
            $path = $this->helper->asset($worker);

            $data[] = [
                'id' => $worker->getId(),
                'name' => $worker->getName(),
                'birthdate' => $worker->getBirthdate()->format('d//m/Y'),
                'address' => $worker->getAddress(),
                'phone' => $worker->getPhone(),
                'email' => $worker->getEmail(),
                'dniNumber' => $worker->getDniNumber(),
                'deparment' => $worker->getDeparment(),
                'photoFile' => $path,
            ];
        }

        return new JsonResponse($data, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/api/workers/{id}", name="update_worker", methods={"PUT"})
     */
    public function updateById($id, Request $request): JsonResponse
    {
        $worker = $this->workerRepository->findOneBy(['id' => $id]);

        if (!$worker)
            throw $this->createNotFoundException('Unable to find Worker.');

        $data = json_decode($request->getContent(), true);       

        $worker->setName($data['name']);
        $worker->setBirthdate(\DateTime::createFromFormat('d/m/Y', $data['birthdate']));
        $worker->setAddress($data['address']);
        $worker->setPhone($data['phone']);
        $worker->setEmail($data['email']);
        $worker->setDniNumber($data['dniNumber']);
        $worker->setDeparment($data['deparment']);

        $updatedWorker = $this->workerRepository->updateWorker($worker);
        $updatedWorkerArray = $updatedWorker->toArray();

        $updatedWorkerArray['photoFile'] = $this->helper->asset($updatedWorker);

        return new JsonResponse($updatedWorkerArray, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/api/workers/{id}", name="delete_worker", methods={"DELETE"})
     */
    public function deleteWorker($id): JsonResponse
    {
        $worker = $this->workerRepository->find($id);

        if (!$worker)
            throw $this->createNotFoundException('Unable to find Worker.');       

        $this->workerRepository->removeWorker($worker);

        return new JsonResponse(['status' => 'Worker deleted!'], JsonResponse::HTTP_OK);      
    }

    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return $this->render('/index.html.twig');
    }
    



}
    